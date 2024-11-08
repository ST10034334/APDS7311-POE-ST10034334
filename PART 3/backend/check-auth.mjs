{/* The IIE (2024) demonstrates the check-auth.mjs - Validation of User Token/Session */}
import jwt from 'jsonwebtoken';

const checkAuthorisation = (req,res,next) =>
{
    try {

        //Extracts the token from the "Authorization" header.
        //The token is expected to be in the format "Bearer <token>", so we split by space and get the second part[1].
        const token = req.headers.authorization.split(" ")[1];

        //Verifies the token using a secret key.
        const decodedToken = jwt.verify(token, "registration_login__user_validation_token_true");

        //Extracts the user's id and role from the decoded token.
        req.user_id = decodedToken.user_id;
        req.role = decodedToken.role;

        //If token verification is successful, continues to the next part.
        next();
    }
    catch(error)
    {
        //Sends a 401 (Unauthorized) response if there's an error (such as token being invalid or missing).
        res.status(401).json({message :  "Token Invalid!"}); 
    }
};

//Exports the checkAuthorisation function to be used in other parts of the application.
export default checkAuthorisation;


{/* REFERENCE LIST:
The IIE. 2024. LAB GUIDE 2024 [APDS7311/w Learn]. The Independent Institute of Education:
Unpublished.    
*/}