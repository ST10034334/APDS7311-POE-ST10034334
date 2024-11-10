// The IIE (2024) demonstrates how to work with routes - User Route.
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import checkAuthorisation from "../check-auth.mjs";

//Creates a new router instance for handling routes.
const router = express.Router();


//Defines a GET route for the root path ("/").
//Gets all users in the collection.
router.get("/", checkAuthorisation, async (req, res) => {

  //Uses the role from the decoded token (from checkAuthorisation middleware).
  const role = req.role;

   //Verifies that the user's role is an Admin (only admins can view all users).
    if (role == "Admin")
     {
    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Finds all documents in the "Users" collection and converts them to an array.
    let results = await collection.find({}).toArray();

    //Sends the results as the response with a status code of 200 (OK).
    res.status(200).send(results);
     }
    else{

        //Sends a 401 (Unauthorized) response if the user's role is not a Customer.
        res.status(401).json({ message: "Payment Creation Failed! User's role must be an Admin." });
    }
});


//Defines a POST route for the "/createUser" path.
//Uses checkAuthorisation to confirm user is logged in.
router.post("/createUser", checkAuthorisation, [
    //Validates and sanitizes fields.
    //Digital Ocean (2024) demonstrates how to use express-validator to filter database inputs.
    body('name').notEmpty().withMessage('Name is required.').trim().escape(),
    body('id_number').isNumeric().withMessage('ID number must only contain digits.').isLength({ min: 13 }).withMessage('ID number must be 13 digits long.').notEmpty().withMessage('ID number is required.'),
    body('account_number').isNumeric().withMessage('Account number must only contain digits.').isLength({ min: 8 }).withMessage('Account number must be at least 8 digits long.').notEmpty().withMessage('Account number is required.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.').notEmpty().withMessage('Password is required.'),
    body('role').notEmpty().withMessage('Role is required.')
],
async (req, res) => {

  //Uses the role from the decoded token (from checkAuthorisation middleware).
  const role = req.role;

    //Handles validation errors by returning a status code 400, with an array of all errors present.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Verifies that the user's role is an Admin (only admins can create users).
    if (role == "Admin")
    {

    //Hashes the password with bcrypt, with a salt of 10, before storing it.
    //freeCodeCamp (2024) demonstrates how to hash passwords with bcrypt.
    const password = bcrypt.hash(req.body.password, 10);

    //Creates a new document from the request body.
    let newDocument = {
        name: req.body.name.toString(), //User's name.
        id_number: req.body.id_number.toString(), //User's ID number.
        account_number: req.body.account_number.toString(), //User's account number.
        password: (await password).toString(), //User's hashed password.
        role: req.body.role.toString() //User's assigned role.
    };

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Attempts to find a user document that has the same account number (no duplicate account numbers allowed).
    let user = await collection.findOne({ account_number: req.body.account_number.toString() });

    if (user) {
        //Sends a 409 (Conflict) response if the account number already exits.
        res.status(409).json({ message: "Creation Failed. Account Number already exists." });
        return;
    }

    //Inserts the new document into the "Users" collection.
    let results = await collection.insertOne(newDocument);

    //Sends a response indicating that the document was successfully inserted with a status code of 201 (Created).
    res.status(201).send({message: "User Creation Successful!", results});
}
    else{

        //Sends a 401 (Unauthorized) response if the user's role is not a Customer.
        res.status(401).json({ message: "Payment Creation Failed! User's role must be an Admin." });
    }
});



//Defines a GET route for retrieving users by user ID.
router.get("/:id", checkAuthorisation, async (req, res) => {

    //Uses the role from the decoded token (from checkAuthorisation middleware).
    const role = req.role;

    //Verifies that the user's role is an Admin or Employee (only they can view the user's for the payments).
    if (role == "Admin" || role == "Employee")
    {

    //Query to find the user by its ID.
    const query = { _id: new ObjectId(req.params.id) }; 

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Finds all documents in the "Users" collection that match query.
    let results = await collection.findOne(query);

    //Sends a response with the payment data if found, or a 404 (Not Found) status if not.
    if (!results) {
        res.status(404).send("User Retrieval Failed! User doesn't exist.");
    } else {
        res.status(200).send(results); 
    }
    }
    else{

    //Sends a 401 (Unauthorized) response if the user's role is not a Customer.
    res.status(401).json({ message: "User Retrieval Failed! User's role must be an Admin or Employee." });
   }
});



//Defines a PATCH route for updating a specific user by ID.
//Uses checkAuthorisation to confirm user is logged in.
router.patch("/updateUser/:id", checkAuthorisation, async (req, res) => {

  //Uses the role from the decoded token (from checkAuthorisation middleware).
  const role = req.role;

    //Verifies that the user's role is an Admin (only admins can update users).
    if (role == "Admin")
    {
    //Query to find the user by its ID.
    const query = { _id: new ObjectId(req.params.id) }; 

    const updates = {
        $set: {
            name: req.body.name,
            id_number: req.body.id_number,
            account_number: req.body.account_number,
            role: req.body.role
        }
    };

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Updates the user that matches the query with the provided updates.
    let results = await collection.updateOne(query, updates);

    //Sends a response with the result of the update operation and a status code of 200 (OK).
    res.status(200).send(results);
}
else{

    //Sends a 401 (Unauthorized) response if the user's role is not a Customer.
    res.status(401).json({ message: "Payment Creation Failed! User's role must be an Admin." });
}
});


//Defines a DELETE route for removing a specific user by ID.
//Uses checkAuthorisation to confirm user is logged in.
router.delete("/removeUser", checkAuthorisation, async (req, res) => {

 //Uses the role from the decoded token (from checkAuthorisation middleware).
  const role = req.role;

  //Verifies that the user's role is an Admin (only admins can delete users).
  if (role == "Admin")
  {
  //Uses 
    const { userID } = req.body;
    console.log(userID)

    //Query to find the user by its ID.
    const query = { _id: new ObjectId(userID)}; 

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Finds the document in the "Users" collection that matches query.
    let userResult = await collection.findOne(query)

    //Checks if the user exists.
    if (!userResult) {

        //Sends a 404 (Not Found) response if the user doesn't exist.
        return res.status(404).json({ message: "User not found." });
    }

    //Deletes the user that matches the query.
    let results = await collection.deleteOne(query);

    //Sends a response with the result of the delete operation and a status code of 200 (OK).
    res.status(200).send(results);
}
else{

    //Sends a 401 (Unauthorized) response if the user's role is not a Customer.
    res.status(401).json({ message: "Payment Creation Failed! User's role must be an Admin." });
}
});


//Exports the router to be used in other parts of the application.
export default router;


/* REFERENCE LIST

Digital Ocean. 2024. How to Handle Form Inputs Efficiently with Express-Validator in ExpressJs, 19 January 2024 (Version 1.0)
[Source code] https://www.digitalocean.com/community/tutorials/how-to-handle-form-inputs-efficiently-with-express-validator-in-express-js
(Accessed 5 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311/w Learn]. The Independent Institute of Education:
Unpublished.    

*/