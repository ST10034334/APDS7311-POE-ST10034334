import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validAccountNumber, validAmount, validCurrency, validName,validProvider, validRecipientBankName, validRecipientBranchCode, validSWIFTCode} from '../regex.js';
import Select from 'react-select';
import '../assets/web/assets/mobirise-icons2/mobirise2.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/socicon/css/styles.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css?v=ZR21yi';


//InternationalPay() function defines a component for the International Pay page.
// The IIE (2024) demonstrates how to work with form submissions - International Pay Page.
//This component takes in a triggerError function to trigger the Error page where appropriate.
//Kim (2022) demonstrates how to use and pass functions as props.
export default function InternationalPay ({triggerError}) {


const [showNextFields, setShowNextFields] = useState(false);
const [name, setName] = useState(null);
const [role, setRole] = useState(null);
const [token, setToken] = useState(null);
const navigate = useNavigate();
const [error, setError] = useState('');


//State to hold payment data.
const [paymentData, setPaymentData] = useState({
    amount: 0.0,
    currency: '',
    provider: '',
    recipient_name: '',
    recipient_account_number: '',
    recipient_bank_name: '',
    recipient_bank_branch_code: '',
    swift_code: '',
    verified: false,
    submit_swift: false
});


//Checks if the user is verified each time the component is navigated to.
//freeCodeCamp (2022) demonstrates how to use localStorage.
useEffect(() => {
    //Gets the user's name, role, and token from localStorage.
    const storedName = localStorage.getItem('name');
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');

    //Sets the appropriate states from localStorage if the data exists.
    //Otherwise, navigates to the Login Page.
    if (storedName && storedRole && storedToken) {
        setName(storedName);
        setRole(storedRole);
        setToken(storedToken);

        //If the role is not a customer, sets an appropriate message in the triggerError function 
        //and navigates to the Error page.
        if (storedRole !== "Customer") {
            triggerError('You do not have the right privileges to access this page.');
            navigate('/error');
        }
    } else {
        //Navigates to the login page if no user data is found.
        navigate('/login');
    }
}, [navigate]);

//handleNextFields() function shows the next required fields if the amount, currency, and provider are valid.
//Watson (2022) demonstrates how to work with React Select.
const handleNextFields = (e) => {
    e.preventDefault(); //Prevents default form submssion behaviour.

    if (checkData())
    {
    setShowNextFields(true);
    }
  };
  
  //handleProviderChange() function sets the provider to the option selected by user.
  //Meta Open Source (2024) demonstrates how to use <select> component.
  const handleProviderChange = (e) => {
    const newProvider = e.target.value;
    updateForm({ provider: newProvider });
  };

  //handleCurrencyChange() function sets the currency to the option selected by user.
  //Meta Open Source (2024) demonstrates how to use <select> component.
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    updateForm({ currency: newCurrency });
  };

  //updateForm() function updates the form fields by setting the payment data.
   function updateForm (value) {
    return setPaymentData((prev) => {
        return {...prev, ...value}
        
    });
}


     //checkData() function performs error handling on amount, currency, and provider.
     function checkData()
     {

        
         //Checks that all fields are inputted.
         if (!paymentData.currency || !paymentData.provider)
            {
                setError('All fields are required to continue.');
    
               //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
                setTimeout(() => setError(''), 3000);
                return false;
            }

              // Checks the amount input field.
             // Ensure the amount is a valid number and greater than 0.
              if (isNaN(paymentData.amount) || paymentData.amount <= 0) {
              setError('Amount must only contain digits. If the amount contains decimal points, use the format: `10.67`.');
    
                //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
               setTimeout(() => setError(''), 3000);
              return false;
            }
    
            //Checks the currency input field.
            //TutorialsPoint (2023) demonstrates how to use RegEx.
            if (!validCurrency.test(paymentData.currency))
                {
                  setError(`Please select a currency from the list provided.`);
        
                    //Clears the error message after 3 seconds.
                   //W3Schools (2024) demonstrates the setTimeout() function.
                   setTimeout(() => setError(''), 3000);
                  return false;
                }
   
            //Checks the provider input field.
            //TutorialsPoint (2023) demonstrates how to use RegEx.
            if (!validProvider.test(paymentData.provider))
               {
                 setError(`Please select a provider from the list provided.`);
       
                   //Clears the error message after 3 seconds.
                  //W3Schools (2024) demonstrates the setTimeout() function.
                  setTimeout(() => setError(''), 3000);
                 return false;
               }

    
            return true;
    };


     //checkNextData() function performs error handling on recipient information and SWIFT code.
     function checkNextData()
     {
 
       
         //Checks the recipient name input field.
         //TutorialsPoint (2023) demonstrates how to use RegEx.
         if (!validName.test(paymentData.recipient_name))
         {
           setError('Recipient name must start with a capital letter, be between 8 and 40 characters long, and include at least one space. You may use letters, hyphens, and apostrophes.');
 
             //Clears the error message after 3 seconds.
            //W3Schools (2024) demonstrates the setTimeout() function.
            setTimeout(() => setError(''), 3000);
           return false;
         }
 
         //Checks the recipient account number input field.
         //TutorialsPoint (2023) demonstrates how to use RegEx.
         if (!validAccountNumber.test(paymentData.recipient_account_number))
             {
                setError('Account number must be between 8 and 11 digits.');
     
                 //Clears the error message after 3 seconds.
                //W3Schools (2024) demonstrates the setTimeout() function.
                setTimeout(() => setError(''), 3000);
               return false;
             }

         //Checks the recipient bank name input field.
         //TutorialsPoint (2023) demonstrates how to use RegEx.
         if (!validRecipientBankName.test(paymentData.recipient_bank_name))
            {
               setError('Recipient bank name must start with a capital letter, be between 4 and 40 characters long. You may use letters and spaces.');

                //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
               setTimeout(() => setError(''), 3000);
              return false;
            }

         //Checks the recipient bank branch code input field.
         //TutorialsPoint (2023) demonstrates how to use RegEx.
         if (!validRecipientBranchCode.test(paymentData.recipient_bank_branch_code))
            {
                setError('Recipient bank branch code must be exactly 6 digits.');

                //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
               setTimeout(() => setError(''), 3000);
              return false;
            }

          //Checks the SWIFT code input field.
         //TutorialsPoint (2023) demonstrates how to use RegEx.
         if (!validSWIFTCode.test(paymentData.swift_code))
            {
                console.log(paymentData.swift_code)
                setError('SWIFT code must be either 8 or 11 characters long. Uppercase and lowercase letters and digits are allowed.');

                //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
               setTimeout(() => setError(''), 3000);
              return false;
            }

              //Checks that all fields are inputted.
         if (!paymentData.recipient_name || !paymentData.recipient_account_number || !paymentData.recipient_bank_name || !paymentData.recipient_bank_branch_code || !paymentData.swift_code)
            {
                setError('All fields are required.');
    
               //Clears the error message after 3 seconds.
               //W3Schools (2024) demonstrates the setTimeout() function.
                setTimeout(() => setError(''), 3000);
                return false;
            }

            return true;
    
    };

    //handleSubmit() function handles the form submission.
    //First, does validation on user-inputted fields, creates a payment object from the payment data, and attempts to
    //use the 'pay/createPayment' POST endpoint to create the payment in database.
    //If successful, resets the payment data, and navigates to the PaymentCreation Page.
    //If not, shows an appropriate error message to the user.
    async function handleSubmit (e) {

        //Prevents the default form submission behavior.
        e.preventDefault();

         //Field validations.
         if (!checkData() || !checkNextData())
         {
            return;
         }
        
        const payment = {...paymentData};

        console.log("Payment Data:", JSON.stringify(payment));

          

        try {

            //The IIE (2024) demonstrates how to include the token in the Authorisation header.
           //Makes an API request to create the payment.
            const response = await fetch("https://renbank-api.oa.r.appspot.com/pay/createPayment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },

                //Sends the payment data in JSON format.
                body: JSON.stringify(payment),
            });

            //Sets error message if payment creation fails.
            if (!response.ok) {
                
                if (response.status === 404)
                {
                  setError('Payment Creation failed. Invalid SWIFT Code.');
                }
                else
                {
                setError('Payment Creation failed. Please try again.');
                }

            //Clears the error message after 3 seconds.
            //W3Schools (2024) demonstrates the setTimeout() function.
            setTimeout(() => setError(''), 3000);
                
            }
            else{
                
                setPaymentData({
                    amount: 0.0,
                    currency: '',
                    provider: '',
                    recipient_name: '',
                    recipient_account_number: '',
                    recipient_bank_name: '',
                    recipient_bank_branch_code: '',
                    swift_code: '',
                    verified: false
                    });
                    
                navigate("/paymentProcessing");
            }
            
        }  catch (error) {
            //Sets error message if something goes wrong.
            setError(error)
            return;
        };
    }


   // Site made with Mobirise Website Builder v5.9.18, https://mobirise.com
    return (

    <body> 
    <br></br>
    <br></br>

   {/* Only shows international pay page if user is logged in and their role is "Customer" */}
   {/* W3Schools (2024) demonstrates the && operator in conditional rendering*/}
    {name && role == "Customer" && (
<section className="form5 cid-umQj9a1h6w">

<div className="mbr-overlay"></div>
<div className="container">
    <div className="row justify-content-center">
        <div className="col-12 content-head">
            <div className="mbr-section-head mb-5">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>International Pay: Seamless Global Transactions</strong><br></br>
                </h3>               
            </div>
        </div>
    </div>
    <br></br>
    <br></br>
    <div className="row justify-content-center">
        <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid">

            {/* Submission Form - International Pay */}
            <form onSubmit={handleSubmit} method="POST" className="mbr-form form-with-styler" data-form-title="Form Name">
            {error && <div className="alert alert-danger">{error}</div>}
                <div className="dragArea row">

                    {/* Amount field */}
                    <div className="col-md col-sm-12 form-group mb-3">
                        <input type="text" name="amount" placeholder="Amount" className="form-control" onChange={(e) => updateForm({ amount: parseFloat(e.target.value) || 0.0 })}/>
                    </div>

                   {/* Currency field */}
                    <div className="col-md col-sm-12 form-group mb-3">
                        {/* Meta Open Source (2024) demonstrates how to use <select> component */}
                         <select id="currency" onChange={handleCurrencyChange} className="form-control">
                         <option value="">--Please choose a currency--</option>
                         <option value="US Dollar (USD)">US Dollar (USD)</option> 
                         <option value="Euro (EUR)">Euro (EUR)</option> 
                         <option value="British Pound (GBP)">British Pound (GBP)</option> 
                         <option value="Japanese Yen (JPY)">Japanese Yen (JPY)</option> 
                         <option value="Swiss Franc (CHF)">Swiss Franc (CHF)</option> 
                         <option value="Canadian Dollar (CAD)">Canadian Dollar (CAD)</option> 
                         <option value="Australian Dollar (AUD)">Australian Dollar (AUD)</option> 
                         <option value="New Zealand Dollar (NZD)">New Zealand Dollar (NZD)</option> 
                         <option value="Chinese Yuan (CNY)">Chinese Yuan (CNY)</option> 
                         <option value="Indian Rupee (INR)">Indian Rupee (INR)</option> 
                         <option value="Brazilian Real (BRL)">Brazilian Real (BRL)</option> 
                         <option value="South African Rand (ZAR)">South African Rand (ZAR)</option> 
                         <option value="Mexican Peso (MXN)">Mexican Peso (MXN)</option>              
                        </select>
                    </div>

                    {/* Provider field */}
                    <div className="col-12 form-group mb-3 mb-3">
                        {/* Meta Open Source (2024) demonstrates how to use <select> component */}
                        <select id="provider" onChange={handleProviderChange} className="form-control">
                         <option value="">--Please choose a provider--</option>
                         <option value="SWIFT">SWIFT</option>                 
                        </select>
                    </div>

                    {/* Continue Button */}
                    <div className="col-lg-12 col-md-12 col-sm-12 align-center mbr-section-btn"><button onClick={handleNextFields} className="btn btn-primary display-7">Continue</button></div>
                </div>

                <br></br>

                {showNextFields && (

                    <>

                    {/* Recipient's Name field */}
                    <div className="col-md col-sm-12 form-group mb-3">
                        <input type="text" name="recipient_name" placeholder="Recipient's full name" className="form-control" onChange={(e) => updateForm({recipient_name: e.target.value})}/>
                    </div>

                    {/* Recipient's Account Number */}
                    <div className="col-md col-sm-12 form-group mb-3">
                        <input type="text" name="recipient_account_number" placeholder="Recipient's account number" className="form-control" onChange={(e) => updateForm({recipient_account_number: e.target.value})}/>
                    </div>

                    {/* Recipient's Bank Name */}
                    <div className="col-md col-sm-12 form-group mb-3">
                        <input type="text" name="recipient_bank_name" placeholder="Recipient's bank name" className="form-control" onChange={(e) => updateForm({recipient_bank_name: e.target.value})}/>
                    </div>


                    {/* Recipient's Bank Branch Code */}
                    <div className="col-md col-sm-12 form-group mb-3">
                        <input type="text" name="recipient_bank_branch_code" placeholder="Recipient's bank branch code" className="form-control" onChange={(e) => updateForm({recipient_bank_branch_code: e.target.value})}/>
                    </div>

                    {/* SWIFT Code */}
                    <div className="col-md col-sm-12 form-group mb-3">
                        <input type="text" name="swift_code" placeholder="SWIFT Code" className="form-control" onChange={(e) => updateForm({swift_code: e.target.value})}/>
                    </div>
                    

                     {/* Pay Now Button */}
                 <div className="col-lg-12 col-md-12 col-sm-12 align-center mbr-section-btn">
                    <button type='submit' className="btn btn-primary display-7">Pay Now</button>
                </div>
                    
                    </>
                )}

            </form>
        </div>
    </div>
</div>
</section>
)}

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
};

/* REFERENCE LIST:
freeCodeCamp. 2022. How to Use localStorage with React Hooks to Set and Get Items, 22 February 2022 (Version 1.0)
[Source code] https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
(Accessed 2 October 2024).

Kim, K. 2022. How to Use and Pass Functions as Props— React. Medium, 21 January 2022 (Version 1.0)
[Soure code] https://medium.com/@kkm2059/how-to-use-and-pass-functions-as-props-react-ff677f5bca0b
(Accessed 4 October 2024).

Meta Open Source. 2024. <select>, 2024 (Version 1.0) 
[Source code] https://react.dev/reference/react-dom/components/select
(Accessed 2 September 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.

TutorialsPoint. 2023. RegEx in ReactJS, 14 September 2023 (Version 2.0)
[Source code] https://www.tutorialspoint.com/regex-in-reactjs
(Accessed 4 October 2024).

W3Schools. 2024. React Conditional Rendering, 2024 (Version 1.0)
[Source code] https://www.w3schools.com/react/react_conditional_rendering.asp
(Accessed 3 October 2024).

W3Schools. 2024. Window setTimeout(), 2024 (Version 1.0)
[Source code] https://www.w3schools.com/jsref/met_win_settimeout.asp
(Accessed 3 October 2024).

Watson, J. 2022. React Select, 2022 (Verison 1.0)
[Source code] https://react-select.com/home
(Accessed 4 October 2024).

 */