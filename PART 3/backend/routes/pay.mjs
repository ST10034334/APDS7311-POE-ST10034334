{/* The IIE (2024) demonstrates how to work with routes - Pay Route */}
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import { body, validationResult } from "express-validator";
import checkAuthorisation from "../check-auth.mjs";
import axios from 'axios';


//Creates a new router instance for handling routes.
const router = express.Router();


//Defines a GET route for the root path ("/").
//Gets all payments in the collection.
router.get("/", async (req, res) => {

    //Retrieves the "Payments" collection from the database.
    let collection = await db.collection("Payments");

    //Finds all documents in the "Payments" collection and converts them to an array.
    let results = await collection.find({}).toArray();

    //Sends the results as the response with a status code of 200 (OK).
    res.status(200).send(results);
});

//Defines a POST route for the "/createPayment" path.
//Uses checkAuthorisation to confirm user is logged in.
router.post("/createPayment", checkAuthorisation, [
    //Validates and sanitizes fields.
    //Digital Ocean (2024) demonstrates how to use express-validator to filter database inputs.
    body('amount').isFloat({min: 1.0}).withMessage('Amount must be at least 1.0.').notEmpty().withMessage('Amount is required.').trim().escape(),
    body('currency').notEmpty().withMessage('Currency is required.').trim().escape(),
    body('provider').notEmpty().withMessage('Provider is required.').trim().escape(),
    body('recipient_name').notEmpty().withMessage('Recipient name is required.').trim().escape(),
    body('recipient_account_number').isNumeric().withMessage("Recipient account number must only contain digits.").isLength({ min: 8 }).withMessage('Recipient account number must be at least 8 digits long.').notEmpty().withMessage('Recipient account number is required.').trim().escape(),
    body('recipient_bank_name').notEmpty().withMessage('Recipient bank name is required.').trim().escape(),
    body('recipient_bank_branch_code').isNumeric().withMessage("Recipient bank branch code must only contain digits.").isLength({ min: 6 }).withMessage('Recipient bank branch code must be at least 6 digits long.').notEmpty().withMessage('Recipient bank branch code is required.').trim().escape(),
    body('swift_code').isLength({ min: 8 }).withMessage('SWIFT code must be at least 8 digits long.').notEmpty().withMessage('SWIFT code is required.').trim().escape(),
    body('verified').isBoolean().withMessage('Verified must either be true/false.').notEmpty().withMessage('Verified is required.').trim().escape(),
    body('submit_swift').isBoolean().withMessage('Submit to SWIFT must either be true/false.').notEmpty().withMessage('Submit to SWIFT is required.').trim().escape()
],
async (req, res) => {

    //Uses the user_id and role from the decoded token (from checkAuthorisation middleware).
    const userId = req.user_id;
    const role = req.role;

     //Handles validation errors by returning a status code 400, with an array of all errors present.
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    //SwiftCode Validation
    const swiftCode = req.body.swift_code;
    try{

        //Makes a request to the SWIFT Code API to validate the swift code.
        const apiResponse = await axios.get(`https://api.api-ninjas.com/v1/swiftcode?swift=${swiftCode}`, {
            headers: { 'X-Api-Key': 'GZPWPpGzfvq7NZv+/nuJhQ==bSoPjN9t4cYf5l8H' }
        });

        if (apiResponse.data.length === 0) {
            // If no data is returned, SWIFT code is invalid
            return res.status(404).json({ message: 'Invalid SWIFT Code. Please check and try again.' });
        }

    }catch (error) {
        // Handle errors from the SWIFT code API request
        console.error(error);
        return res.status(500).json({ message: 'Failed to verify SWIFT code. Please try again later.' });
    }


    //Verifies that the user's role is a Customer (only customers can make international payments).
    if (role == "Customer")
    {

    //Creates a new document from the request body.
    let newDocument = {
        user: userId, //User information.
        amount: req.body.amount, //Payment amount.
        currency: req.body.currency, //Selected currency.
        provider: req.body.provider, //Selected provider.
        recipient_name: req.body.recipient_name, //Recipient's full name.
        recipient_account_number: req.body.recipient_account_number, //Recipient's account number.
        recipient_bank_name: req.body.recipient_bank_name, //Recipient's bank name.
        recipient_bank_branch_code: req.body.recipient_bank_branch_code, //Recipient's bank code.
        swift_code : req.body.swift_code, //SWIFT code.
        verified : req.body.verified, //Default payment verification.
        submit_swift : req.body.submit_swift //Default submit to SWIFT.
    };

    //Retrieves the "Payments" collection from the database.
    let collection = await db.collection("Payments");

    //Inserts the new document into the "Payments" collection.
    let results = await collection.insertOne(newDocument);

    //Sends a response indicating that the document was successfully inserted with a status code of 201 (Created).
    res.status(201).send({message: "Payment Creation Successful!", results});
    }
    else{

        //Sends a 401 (Unauthorized) response if the user's role is not a Customer.
        res.status(401).json({ message: "Payment Creation Failed! User's role must be a Customer." });
    }
});

//Defines a PATCH route for updating a specific payment by ID to reflect its verification.
//Uses checkAuthorisation to confirm user is logged in.
router.patch("/updateVerification/:id", checkAuthorisation, async (req, res) => {

    //Query to find the payment by its ID.
    const query = { _id: new ObjectId(req.params.id) }; 

    const updates = {
        $set: {
            verified: req.body.verified //Updated verified field.
        }
    };


    //Retrieves the "Payments" collection from the database.
    let collection = await db.collection("Payments");

    //Updates the payment that matches the query with the provided updates.
    let results = await collection.updateOne(query, updates);

    //Sends a response with the result of the update operation and a status code of 200 (OK).
    res.status(200).send(results);
});



//Defines a PATCH route for updating a specific payment by ID to reflect its submission to SWIFT.
//Uses checkAuthorisation to confirm user is logged in.
router.patch("/updateSubmission/:id", checkAuthorisation, async (req, res) => {

    //Query to find the payment by its ID.
    const query = { _id: new ObjectId(req.params.id) }; 

    const updates = {
        $set: {
            submit_swift: req.body.submit_swift //Updated submit_swift field.
        }
    };


    //Retrieves the "Payments" collection from the database.
    let collection = await db.collection("Payments");

    //Updates the payment that matches the query with the provided updates.
    let results = await collection.updateOne(query, updates);

    //Sends a response with the result of the update operation and a status code of 200 (OK).
    res.status(200).send(results);
});


//Defines a GET route for retrieving payments by user ID.
router.get("/myPayments", checkAuthorisation, async (req, res) => {

    //Uses the user_id and role from the decoded token (from checkAuthorisation middleware).
    const userId = req.user_id;
    const role = req.role;

    //Verifies that the user's role is a Customer (only customers can view their own international payments).
    if (role == "Customer")
    {

    console.log(userId)

    //Query to find the payments made by user ID.
    const query = { user: userId}; 

    //Retrieves the "Payments" collection from the database.
    let collection = await db.collection("Payments");

    //Finds all documents in the "Payments" collection that match query and converts them to an array.
    let results = await collection.find(query).toArray();

    //Sends a response with the payment data if found, or a 404 (Not Found) status if not.
    if (results.length === 0) {
        res.status(404).send("No payments found for this user.");
    } else {
        res.status(200).send(results); 
    }
    }
    else{

    //Sends a 401 (Unauthorized) response if the user's role is not a Customer.
    res.status(401).json({ message: "Payment Retrieval Failed! User's role must be a Customer." });
   }
});


//Defines a DELETE route for removing a specific payment by ID.
//Uses checkAuthorisation to confirm user is logged in.
router.delete("/removePayment", checkAuthorisation, async (req, res) => {
    const { paymentID } = req.body;

    //Query to find the payment by its ID.
    const query = { _id: new ObjectId(paymentID)}; 

    //Retrieves the "Payments" collection from the database.
    let collection = await db.collection("Payments");

    //Finds the document in the "Payments" collection that matches query.
    let paymentResult = await collection.find({query})

    //Checks if the payment exists.
    if (!paymentResult) {

        //Sends a 404 (Not Found) response if the payment doesn't exist.
        return res.status(404).json({ message: "Payment not found." });
    }

    //Checks if the payment is verified.
    if (paymentResult.verified) {

       //Sends a 403 (Forbidden) response if the payment has already been verified.
        return res.status(403).json({ message: "Cannot delete a verified payment." });
    }

    //Deletes the payment that matches the query.
    let results = await collection.deleteOne(query);

    //Sends a response with the result of the delete operation and a status code of 200 (OK).
    res.status(200).send(results);
});


//Exports the router to be used in other parts of the application.
export default router;


{/* REFERENCE LIST:

Digital Ocean. 2024. How to Handle Form Inputs Efficiently with Express-Validator in ExpressJs, 19 January 2024 (Version 1.0)
[Source code] https://www.digitalocean.com/community/tutorials/how-to-handle-form-inputs-efficiently-with-express-validator-in-express-js
(Accessed 5 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311/w Learn]. The Independent Institute of Education:
Unpublished.    
*/}