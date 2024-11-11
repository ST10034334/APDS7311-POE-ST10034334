import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validAccountNumber, validName, validPassword, validIDNumber} from '../regex.js';
import "../assets/web/assets/mobirise-icons2/mobirise2.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/bootstrap/css/bootstrap-grid.min.css";
import "../assets/bootstrap/css/bootstrap-reboot.min.css";
import "../assets/dropdown/css/style.css";
import "../assets/socicon/css/styles.css";
import "../assets/theme/css/style.css";
import "../assets/mobirise/css/mbr-additional.css?v=ZR21yi";
import DOMPurify from "dompurify";

//Register() function defines a component for the Register page.
{
  /* The IIE (2024) demonstrates how to work with form submissions - Register Page */
}
export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  //State to hold registration data.
  const [regData, setRegData] = useState({
    name: "",
    id_number: "",
    account_number: "",
    password: "",
  });

    //updateForm() function updates the form fields by setting the registration data.
    function updateForm (value) {
        return setRegData((prev) => {
            return {...prev, ...value}
    });
    };

    //checkData() function performs error handling on all registration input.
    function checkData()
    {

        //Checks that all fields are inputted.
        if (!regData.name || !regData.id_number || !regData.account_number || !regData.password)
        {
            setError('All fields are required.');

           //Clears the error message after 3 seconds.
           //W3Schools (2024) demonstrates the setTimeout() function.
            setTimeout(() => setError(''), 3000);
            return false;
        }

        //Checks the full name input field.
        //TutorialsPoint (2023) demonstrates how to use RegEx.
        if (!validName.test(regData.name))
        {
          setError('Full name must start with a capital letter, be between 8 and 40 characters long, and include at least one space. You may use letters, hyphens, and apostrophes.');

            //Clears the error message after 3 seconds.
           //W3Schools (2024) demonstrates the setTimeout() function.
           setTimeout(() => setError(''), 3000);
          return false;
        }

        //Checks the ID number input field.
        //TutorialsPoint (2023) demonstrates how to use RegEx.
        if (!validIDNumber.test(regData.id_number))
            {
              setError(`ID number must be exactly 13 digits with valid date of birth, gender, \n 
                 citizenship status, and checksum values.`);
    
                //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
               setTimeout(() => setError(''), 3000);
              return false;
            }


        //Checks the account number input field.
        //TutorialsPoint (2023) demonstrates how to use RegEx.
        if (!validAccountNumber.test(regData.account_number))
            {
              setError('Account number must be between 8 and 11 digits.');
    
                //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
               setTimeout(() => setError(''), 3000);
              return false;
            }

        //Checks the password input field.
        //TutorialsPoint (2023) demonstrates how to use RegEx.
        if (!validPassword.test(regData.password))
            {
              setError(`Password must be between 8 and 20 characters and must contain at least \n 
                        one uppercase, lowercase, digit, and special character in the set [@$!%*?&^()]`);
    
                //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
               setTimeout(() => setError(''), 3000);
              return false;
            }

            
            
        return true;
}

  //handleSubmit() function handles the form submission.
  //First, does validation on user-inputted fields, creates a user object from the registration data, and attempts to
  //use the 'auth/register' POST endpoint to create the user in database.
  //If successful, resets the registration data, and navigates to the Login Page.
  //If not, shows an appropriate error message to the user.
  async function handleSubmit(e) {
    //Prevents the default form submission behavior.
    e.preventDefault();

    //Field validations.
    if (!checkData()) {
      return;
    }

    //Sanitizes registration data.
    const sanitizedRegData = {
      name: DOMPurify.sanitize(regData.name),
      id_number: DOMPurify.sanitize(regData.id_number),
      account_number: DOMPurify.sanitize(regData.account_number),
      password: DOMPurify.sanitize(regData.password),
    };

    const user = { ...sanitizedRegData };

    try {
      //Makes an API request to register the user.
      const response = await fetch(
        "https://renbank-api.oa.r.appspot.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          //Sends the user data in JSON format.
          body: JSON.stringify(user),
        }
      );

      //Sets error message if registration fails.
      if (!response.ok) {
        setError("Registration failed. Please try again.");
        //Clears the error message after 3 seconds.
        //W3Schools (2024) demonstrates the setTimeout() function.
        setTimeout(() => setError(""), 3000);
      } else {
        setRegData({
          name: "",
          id_number: "",
          account_number: "",
          password: "",
        });

        navigate("/login");
      }
    } catch (error) {
      //Sets error message if something goes wrong.
      setError(error);
      return;
    }
  };

  {
    /* Site made with Mobirise Website Builder v5.9.18, https://mobirise.com */
  }
  return (
    <div>
      <br></br>
      <br></br>
      <section className="form5 cid-umQks5L8Vs">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 content-head">
              <div className="mbr-section-head mb-5">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                  <strong>Register</strong>
                </h3>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid">
              {/* Submission Form - Registration */}
              <form
                onSubmit={handleSubmit}
                className="mbr-form form-with-styler"
              >
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="dragArea row">
                  {/* Name field */}
                  <div
                    className="col-md col-sm-12 form-group mb-3"
                    data-for="name"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="form-control"
                      onChange={(e) => updateForm({ name: e.target.value })}
                    ></input>
                  </div>

                  {/* ID Number field */}
                  <div
                    className="col-md col-sm-12 form-group mb-3"
                    data-for="idNum"
                  >
                    <input
                      type="text"
                      name="id_number"
                      placeholder="ID Number"
                      className="form-control"
                      onChange={(e) =>
                        updateForm({ id_number: e.target.value })
                      }
                    ></input>
                  </div>

                  {/* Account Number field */}
                  <div
                    className="col-12 form-group mb-3 mb-3"
                    data-for="accoutNum"
                  >
                    <input
                      type="text"
                      name="account_number"
                      placeholder="Account Number"
                      className="form-control"
                      onChange={(e) =>
                        updateForm({ account_number: e.target.value })
                      }
                    ></input>
                  </div>

                  {/* Password field */}
                  <div className="col-12 form-group mb-3" data-for="password">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => updateForm({ password: e.target.value })}
                    ></input>
                  </div>

                  {/* Save button */}
                  <div className="col-lg-12 col-md-12 col-sm-12 align-center mbr-section-btn">
                    <button type="submit" className="btn btn-primary display-7">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="footer7 cid-umQcqHNF3v">
        <div className="container">
          <div className="media-container-row align-center mbr-white">
            <div className="col-12">
              <p className="mbr-text mb-0 mbr-fonts-style display-7">
                © Copyright 2024 RenBank - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

{
  /* REFERENCE LIST:
The IIE. 2024. LAB GUIDE 2024 [APDS7311/w Learn]. The Independent Institute of Education:
Unpublished.   

TutorialsPoint. 2023. RegEx in ReactJS, 14 September 2023 (Version 2.0)
[Source code] https://www.tutorialspoint.com/regex-in-reactjs
(Accessed 4 October 2024).

W3Schools. 2024. Window setTimeout(), 2024 (Version 1.0)
[Source code] https://www.w3schools.com/jsref/met_win_settimeout.asp
(Accessed 3 October 2024). 
*/
}
