{/* The IIE (2024) demonstrates how to work with routes - Auth Route */}
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import ExpressBrute from "express-brute";

//Creates a new router instance for handling routes.
const router = express.Router(); 

//Creates an in-memory store for brute-force protection to track login attempts.
var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store, {

    freeRetries: 5, //Number of allowed attempts before blocking.
    minTimeout: 2 * 60 * 1000, //Blocks for 15 minutes after exceeding attempts.
    maxTimeout: 30 * 60 * 1000 //Maximum block time (30 minutes).
})

//Defines a POST route for registering a new user.
router.post("/register", [
    //Validates and sanitizes fields.
    //Digital Ocean (2024) demonstrates how to use express-validator to filter database inputs.
    body('name').notEmpty().withMessage('Name is required.').trim().escape(),
    body('id_number').isNumeric().withMessage('ID number must only contain digits.').isLength({ min: 13 }).withMessage('ID number must be 13 digits long.').notEmpty().withMessage('ID number is required.'),
    body('account_number').isNumeric().withMessage('Account number must only contain digits.').isLength({ min: 8 }).withMessage('Account number must be at least 8 digits long.').notEmpty().withMessage('Account number is required.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.').notEmpty().withMessage('Password is required.')
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
        role: "Customer" //Default role.
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

//Defines a POST route for logging in a user, with brute-force protection.
router.post("/login",  bruteforce.prevent, [
    //Validates and sanitizes fields.
    //Digital Ocean (2024) demonstrates how to use express-validator to filter database inputs.
    body('name').notEmpty().withMessage('Name is required.').trim().escape(),
    body('account_number').isNumeric().withMessage('Account number must only contain digits.').isLength({ min: 8 }).withMessage('Account number must be at least 8 digits long.').notEmpty().withMessage('Account number is required.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.').notEmpty().withMessage('Password is required.')
], 
async (req, res) => {
    const { name, account_number, password } = req.body;

     //Handles validation errors by returning a status code 400, with an array of all errors present.
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    try {
        //Retrieves the "Users" collection from the database.
        let collection = await db.collection("Users");

        //Finds a user document that matches the provided user's name (full name) and account number.
        let user = await collection.findOne({ name, account_number });

        if (!user) {
            //Sends a 401 (Unauthorized) response if the user is not found.
            res.status(401).json({ message: "Authentication Failed! User doesn't exist." });
            return;
        }

        //Compares the provided password with the stored hashed password.
        //freeCodeCamp (2024) demonstrates how to compare passwords with bcrypt.
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {

            //Sends a 401 (Unauthorized) response if the password does not match.
            res.status(401).json({ message: "Authentication Failed! Incorrect password." });

        } else {

            //Generates a JSON Web Token (JWT) for the authenticated user with their _id and role included.
            const token = jwt.sign({ user_id: user._id, role: user.role}, "registration_login__user_validation_token_true", { expiresIn: "1h" });

            //Sends a response with the success message, token, user name and role.
            res.status(200).json({ message: "Authentication Successful!", token: token, name: user.name, role: user.role});
        }
    } catch (e) {

        //Logs and sends a 500 (Internal Server Error) response if an exception occurs.
        console.error("Login error", e);
        res.status(500).json({ message: "Login Failed!" });
    }
});


//Exports the router to be used in other parts of the application.
export default router;

{/* REFERENCE LIST:

Digital Ocean. 2024. How to Handle Form Inputs Efficiently with Express-Validator in ExpressJs, 19 January 2024 (Version 1.0)
[Source code] https://www.digitalocean.com/community/tutorials/how-to-handle-form-inputs-efficiently-with-express-validator-in-express-js
(Accessed 5 October 2024).

freeCodeCamp. 2024. How to Hash Passwords with bcrypt in Node.js, 3 April 2024 (Version 1.0)
[Source code] https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
(Accessed 1 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311/w Learn]. The Independent Institute of Education:
Unpublished.    
*/}