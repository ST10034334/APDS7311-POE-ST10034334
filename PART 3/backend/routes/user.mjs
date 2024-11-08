{/* The IIE (2024) demonstrates how to work with routes - User Route */}
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import { body, validationResult } from "express-validator";
import checkAuthorisation from "../check-auth.mjs";
import axios from 'axios';


//Creates a new router instance for handling routes.
const router = express.Router();


//Defines a GET route for the root path ("/").
//Gets all users in the collection.
router.get("/", async (req, res) => {

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Finds all documents in the "Users" collection and converts them to an array.
    let results = await collection.find({}).toArray();

    //Sends the results as the response with a status code of 200 (OK).
    res.status(200).send(results);
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

    //Handles validation errors by returning a status code 400, with an array of all errors present.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Hashes the password with bcrypt, with a salt of 10, before storing it.
    //freeCodeCamp (2024) demonstrates how to hash passwords with bcrypt.
    const password = bcrypt.hash(req.body.password, 10);

    //Creates a new document from the request body.
    let newDocument = {
        name: req.body.name, //User's name.
        id_number: req.body.id_number, //User's ID number.
        account_number: req.body.account_number, //User's account number.
        password: (await password).toString(), //User's hashed password.
        role: req.body.role //User's assigned role.
    };

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Attempts to find a user document that has the same account number (no duplicate account numbers allowed).
    let user = await collection.findOne({ account_number: req.body.account_number });

    if (user) {
        //Sends a 409 (Conflict) response if the account number already exits.
        res.status(409).json({ message: "Registration Failed. Account Number already exists." });
        return;
    }

    //Inserts the new document into the "Users" collection.
    let results = await collection.insertOne(newDocument);

    //Sends a response indicating that the document was successfully inserted with a status code of 201 (Created).
    res.status(201).send({message: "User Registration Successful!", results});
});


//Defines a PATCH route for updating a specific user by ID to reflect its verification.
//Uses checkAuthorisation to confirm user is logged in.
router.patch("/:id", checkAuthorisation, async (req, res) => {

    //Query to find the user by its ID.
    const query = { _id: new ObjectId(req.params.id) }; 

    const updates = {
        $set: {
            verified: req.body.verified //Updated verified field.
        }
    };

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Updates the user that matches the query with the provided updates.
    let results = await collection.updateOne(query, updates);

    //Sends a response with the result of the update operation and a status code of 200 (OK).
    res.status(200).send(results);
});


//Defines a GET route for retrieving user by user ID.
router.get("/:id", checkAuthorisation, async (req, res) => {

    //Uses the user_id and role from the decoded token (from checkAuthorisation middleware).
    const userId = req.user_id;

    console.log(userId)

   //Query to find the user by its ID.
   const query = { _id: new ObjectId(req.params.id) }; 

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Finds the document in the "Users" collection that matches query.
    let results = await collection.findOne(query);

    //Sends a response with the user data if found, or a 404 (Not Found) status if not.
    if (!results) {
        res.status(404).send("User doesn't exist.");
    } else {
        res.status(200).send(results); 
    }

});


//Defines a DELETE route for removing a specific user by ID.
//Uses checkAuthorisation to confirm user is logged in.
router.delete("/removeUser", checkAuthorisation, async (req, res) => {
    const { userID } = req.body;

    //Query to find the user by its ID.
    const query = { _id: new ObjectId(userID)}; 

    //Retrieves the "Users" collection from the database.
    let collection = await db.collection("Users");

    //Finds the document in the "Users" collection that matches query.
    let userResult = await collection.find({query})

    //Checks if the user exists.
    if (!userResult) {

        //Sends a 404 (Not Found) response if the user doesn't exist.
        return res.status(404).json({ message: "User not found." });
    }

    //Checks if the user is verified.
    if (userResult.verified) {

       //Sends a 403 (Forbidden) response if the user has already been verified.
        return res.status(403).json({ message: "Cannot delete a verified user." });
    }

    //Deletes the user that matches the query.
    let results = await collection.deleteOne(query);

    //Sends a response with the result of the delete operation and a status code of 200 (OK).
    res.status(200).send(results);
});


//Exports the router to be used in other parts of the application.
export default router;


{/* REFERENCE LIST

Digital Ocean. 2024. How to Handle Form Inputs Efficiently with Express-Validator in ExpressJs, 19 January 2024 (Version 1.0)
[Source code] https://www.digitalocean.com/community/tutorials/how-to-handle-form-inputs-efficiently-with-express-validator-in-express-js
(Accessed 5 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311/w Learn]. The Independent Institute of Education:
Unpublished.    

*/}