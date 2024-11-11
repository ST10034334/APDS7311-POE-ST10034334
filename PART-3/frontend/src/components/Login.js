import React, { useEffect, useState } from "react";
import { validAccountNumber, validName, validPassword} from '../regex.js';
import { useNavigate } from "react-router-dom";
import "../assets/web/assets/mobirise-icons2/mobirise2.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/bootstrap/css/bootstrap-grid.min.css";
import "../assets/bootstrap/css/bootstrap-reboot.min.css";
import "../assets/dropdown/css/style.css";
import "../assets/socicon/css/styles.css";
import "../assets/theme/css/style.css";
import "../assets/mobirise/css/mbr-additional.css?v=ZR21yi";
import DOMPurify from "dompurify";

//Login() function defines a component for the Login page.
//The IIE (2024) demonstrates how to work with form submissions - Login Page.
export default function Login() {
  const navigateHome = useNavigate();
  const [error, setError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState("");

  //Checks if the user is not blocked for login each time the component is mounted.
  //The IIE (2024) demonstrates how to save data in localStorage.
  useEffect(() => {
    //Gets the blocked flag and message from localStorage.
    const storedFlag = localStorage.getItem("blocked");
    const storedMsg = localStorage.getItem("blockedMsg");

    //Sets the appropriate states from localStorage if the data exists.
    if (storedFlag && storedMsg) {
      setIsBlocked(storedFlag);
      setBlockedMsg(storedMsg);

      //Starts the timer if the flag is true (user is blocked).
      if (storedFlag === "true") {
        startTimer();
      }
    }
  });


      //startTimer() function keeps the frontend user login blocked for 15 minutes.
      const startTimer = () => {
        
        //W3Schools (2024) demonstrates the setTimeout() function.
        setTimeout(() => {
            localStorage.removeItem('blocked');
            window.location.reload();
          }, 15000); 
     }

  //State to hold login data.
  const [loginData, setLoginData] = useState({
    name: "",
    account_number: "",
    password: "",
  });

  //updateForm() function updates the form fields by setting the login data.
  function updateForm(value) {
    return setLoginData((prev) => {
      return { ...prev, ...value };
    });
  }

    //checkData() function performs error handling on all login input.
      function checkData()
      {
  
          //Checks that all fields are inputted.
          if (!loginData.name || !loginData.account_number || !loginData.password)
          {
              setError('All fields are required.');
  
             //Clears the error message after 3 seconds.
             //W3Schools (2024) demonstrates the setTimeout() function.
              setTimeout(() => setError(''), 3000);
              return false;
          }
  
          //Checks the full name input field.
          //TutorialsPoint (2023) demonstrates how to use RegEx.
          if (!validName.test(loginData.name))
          {
            setError('Full name must be between 8 and 40 characters and must contain at least one space. Letters, hyphens, and apostrophes are allowed.');
  
              //Clears the error message after 3 seconds.
             //W3Schools (2024) demonstrates the setTimeout() function.
             setTimeout(() => setError(''), 3000);
            return false;
          }
  
          //Checks the account number input field.
          //TutorialsPoint (2023) demonstrates how to use RegEx.
          if (!validAccountNumber.test(loginData.account_number))
              {
                setError('Account number must be between 8 and 11 digits.');
      
                  //Clears the error message after 3 seconds.
                 //W3Schools (2024) demonstrates the setTimeout() function.
                 setTimeout(() => setError(''), 3000);
                return false;
              }
  
          //Checks the password input field.
          //TutorialsPoint (2023) demonstrates how to use RegEx.
          if (!validPassword.test(loginData.password))
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
  //First, does validation on user-inputted fields, creates a user object from the login data, and attempts to
  //use the 'auth/login' POST endpoint to authenticate the user.
  //If successful, adds token, name, and role to localStorage, resets the login data, and navigates to the Home Page.
  //If not, shows an appropriate error message to the user.
  async function handleSubmit(e) {
    //Prevents the default form submission behavior.
    e.preventDefault();

    if (checkData())
    {
      
    //Sanitizes login data.
    const sanitizedLoginData = {
      name: DOMPurify.sanitize(loginData.name),
      account_number: DOMPurify.sanitize(loginData.account_number),
      password: DOMPurify.sanitize(loginData.password),
    };

    const user = { ...sanitizedLoginData };

    try {
      //Makes an API request to login the user.
      const response = await fetch(
        "https://renbank-api.oa.r.appspot.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          //Sends the user data in JSON format.
          body: JSON.stringify(user),
        }
      );

      //Sets error message if login fails.
      if (!response.ok) {
        console.log("RESPONSE: " + response.status)
        //Sets blocked message if login fails after exceeding login attempts.
        if (response.status === 429) {
          //Stores the blocked flag and message in localStorage.
          localStorage.setItem("blocked", "true");
          localStorage.setItem(
            "blockedMsg",
            "Your 3 attemps have been used! You cannot access RenBank services for the next 15 minutes."
          );
          window.location.reload();
        } else {
          setError("Login failed. Please try again.");
          //Clears the error message after 3 seconds.
          //W3Schools (2024) demonstrates the setTimeout() function.
          setTimeout(() => setError(""), 3000);
        }
      } else {
        {
          /* The IIE (2024) demonstrates how to save data in localStorage */
        }
        const data = await response.json();
        const { token, name, role } = data;

        console.log("Token:", token);
        console.log("Role:", role);
        console.log("Name:", name);

        //Stores the token, role, and name in localStorage.
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);

        setLoginData({
          name: "",
          account_number: "",
          password: "",
        });

        navigateHome("/");
      }
    } catch (error) {
      //Sets error message if something goes wrong.
      setError(error);
      return;
    }
  }
  }

  //Site made with Mobirise Website Builder v5.9.18, https://mobirise.com
  return (
    <body>
      <br></br>
      <br></br>
      <section className="form5 cid-umQlCBzxzA">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 content-head">
              <div className="mbr-section-head mb-5">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                  <strong>Login</strong>
                </h3>
              </div>
            </div>
          </div>

          {/* Only shows the Login form if user is not blocked, otherwise shows blocked message */}
          {/* Purohit (2024) demonstrates how to use the ternary opertor*/}
          {!isBlocked ? (
            <div className="row justify-content-center">
              <div
                className="col-lg-8 mx-auto mbr-form"
                data-form-type="formoid"
              >
                {/* Submission Form - Login */}
                <form
                  onSubmit={handleSubmit}
                  className="mbr-form form-with-styler"
                  data-form-title="Form Name"
                >
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="dragArea row">
                    {/* Name field */}
                    <div
                      className="col-md col-sm-12 form-group mb-3"
                      data-for="email"
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control"
                        onChange={(e) => updateForm({ name: e.target.value })}
                      ></input>
                    </div>

                    {/* Account Number field */}
                    <div className="col-12 form-group mb-3 mb-3" data-for="url">
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
                    <div className="col-12 form-group mb-3" data-for="textarea">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={(e) =>
                          updateForm({ password: e.target.value })
                        }
                      ></input>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 align-center mbr-section-btn">
                      <button
                        type="submit"
                        className="btn btn-primary display-7"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
              {blockedMsg && (
                <div className="alert alert-danger">{blockedMsg}</div>
              )}
            </div>
          )}
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
    </body>
  );
}

/* REFERENCE LIST:

Purohit, R. 2024. How to Use the Ternary Operator in React for Cleaner Code. DhiWise, 9 August 2024 (Version 2.0)
[Source code] https://www.dhiwise.com/post/how-to-use-the-ternary-operator-in-react-for-cleaner-code
(Accessed 2 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.

TutorialsPoint. 2023. RegEx in ReactJS, 14 September 2023 (Version 2.0)
[Source code] https://www.tutorialspoint.com/regex-in-reactjs
(Accessed 4 October 2024).

W3Schools. 2024. Window setTimeout(), 2024 (Version 1.0)
[Source code] https://www.w3schools.com/jsref/met_win_settimeout.asp
(Accessed 3 October 2024).
*/
