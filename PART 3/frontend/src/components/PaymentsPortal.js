import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/web/assets/mobirise-icons2/mobirise2.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/socicon/css/styles.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css?v=ZR21yi';


//PaymentsPortal() function defines a component for the PaymentsPortal page.
{/* The IIE (2024) demonstrates how to work with retrieving table data - PaymentsPortal Page */}
//This component takes in a triggerError function to trigger the Error page where appropriate.
//Kim (2022) demonstrates how to use and pass functions as props.
export default function PaymentsPortal ({triggerError}) {

    //freeCodeCamp (2022) demonstrates how to use localStorage.
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [role, setRole] = useState(localStorage.getItem('role'));
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');

    //Checks if the user is verified each time the component is navigated to. 
    useEffect(() => {

        //If no token or role, redirects to the login page.
        if (!token || !role) {

            navigate('/login');
          } 
          
         //If role is not 'Employee' or 'Admin', shows error and navigates to the error page.
          else if (role !== 'Employee' && role !== 'Admin') {

            triggerError('You do not have the right privileges to access this page.');
            navigate('/error');

          } else {

            //Calls getAllPayments if token and role are valid.
            getAllPayments();
          }
        }, [token, role, navigate]); 

    //getAllPayments() function handles displaying all international payments made.
    //Uses the 'pay/' GET endpoint to retrieve the list of payments made by customers from database.
    //If successful, sets the payment data accordingly.
    //If not, shows an appropriate error message to the user.
    async function getAllPayments () {

        try {

            console.log(token)

           //Makes an API request to get the payments.
            const response = await fetch("https://renbank-api.oa.r.appspot.com/pay/", {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                },
            });

            console.log(response.status)

            //Sets error message if retrieval fails.
            if (!response.ok) {

             setError('Payment Retrieval failed: ' + response.statusText );

             //Clears the error message after 3 seconds.
            //W3Schools (2024) demonstrates the setTimeout() function.
             setTimeout(() => setError(''), 3000);
            }
            else{
                
                const payments = await response.json();
                setPayments(payments);

                  //For each payment, gets the user data if not already fetched.
                  payments.forEach(async (payment) => {

                    //Checks if user data is not already loaded in the user state.
                    if (!users[payment.user]) {  

                        //Fetches user data by user ID by calling the getUserData() function.
                        await getUser(payment.user);  
                    }
                });

            }
            
        }  catch (error) {
            //Sets error message if something goes wrong.
            setError(error)
            return;
        };
    };


 //filteredPayments constant filters payments based on the selected verification status.
 //Nawo (2022) demonstrates how to use the array filter() method.
 const filteredPayments = payments.filter(payment => {

    if (filter === 'verified') {
      return payment.verified === 'true';
    } else if (filter === 'unverified') {
      return payment.verified === 'false';
    }

    //Shows all payments.
    return filter === 'all'
  });


//getUser() function handles fetching the user's data for each payment.
//Uses the 'user/:id' PATCH endpoint to retrieve the specific payment's user info from database.
//If successful, sets each user with their associated id to the state.
//If not, shows an appropriate error message to the user.
async function getUser(userID) {
  console.log(userID)
  try {

    //Makes an API request to get the user.
    const response = await fetch(`https://renbank-api.oa.r.appspot.com/user/${userID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    //Sets error message if retrieval fails, else sets the user state.
    if (!response.ok) {
      setError('User Retrieval failed: ' + response.statusText);

       //Clears the error message after 3 seconds.
      //W3Schools (2024) demonstrates the setTimeout() function.
      setTimeout(() => setError(''), 3000);
    }
    else{

      //Retrieves response from API.
      const userData = await response.json();

      //Stores user data by userId.
      setUsers(prevState => ({
          ...prevState,
          [userID]: userData 
      }));
      console.log("USER DATA: " + userData)
    }
  } catch (error) {

    //Sets error message if something goes wrong.
    setError('Error updating verification: ' + error.message);
  }
};


//handleVerification() function handles updating the payment's verification status.
//Uses the 'pay/updateVerification/:id' PATCH endpoint to update the specific payment's verified field in database.
//If successful, shows an appropriate success message to the user.
//If not, shows an appropriate error message to the user.
async function handleVerification(paymentID) {
  console.log(paymentID)
  try {

    //Makes an API request to update the payments.
    const response = await fetch(`https://renbank-api.oa.r.appspot.com/pay/updateVerification/${paymentID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ verified: 'true' }) 
    });

    //Sets error message if update fails, else sets success message.
    if (!response.ok) {
      setError('Verification update failed: ' + response.statusText);

       //Clears the error message after 3 seconds.
      //W3Schools (2024) demonstrates the setTimeout() function.
      setTimeout(() => setError(''), 3000);
    }
    else{
      setMessage('Verification Update Successful');

      //Clears the error message after 3 seconds.
     //W3Schools (2024) demonstrates the setTimeout() function.
     setTimeout(() => setMessage(''), 3000);
    }
  } catch (error) {

    //Sets error message if something goes wrong.
    setError('Error updating verification: ' + error.message);
  }
};



//handleSubmission() function handles updating the payment's submit to SWIFT status.
//Uses the 'pay/updateSubmission/:id' PATCH endpoint to update the specific payment's submit_swift field in database.
//If successful, shows an appropriate success message to the user.
//If not, shows an appropriate error message to the user.
async function handleSubmission(paymentID) {
  console.log(paymentID)
  try {

    //Makes an API request to update the payments.
    const response = await fetch(`https://renbank-api.oa.r.appspot.com/pay/updateSubmission/${paymentID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ submit_swift: 'true' }) 
    });

    //Sets error message if update fails, else sets success message.
    if (!response.ok) {
      setError('Submission to SWIFT failed: ' + response.statusText);

       //Clears the error message after 3 seconds.
      //W3Schools (2024) demonstrates the setTimeout() function.
      setTimeout(() => setError(''), 3000);
    }
    else{
      setMessage('Submission to SWIFT Successful');

      //Clears the error message after 3 seconds.
     //W3Schools (2024) demonstrates the setTimeout() function.
     setTimeout(() => setMessage(''), 3000);
    }
  } catch (error) {

    //Sets error message if something goes wrong.
    setError('Error updating submission to SWIFT: ' + error.message);
  }
};


    return (
<body> 

<section className="features1 cid-sFzyUE9AaP">

{/* The IIE demonstrates how to create a table with data */}
<div className="container-fluid">
  <div className="row">
    <div className="col-12 col-lg-9">
      <h3 className="mbr-section-title mbr-fonts-style align-center mb-4 display-2">
        <strong>International Payments</strong>
      </h3>
    </div>
  </div>

   {/* Handles all the filters for the table */}
  <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '0' }}>
  <div className="nav-item">
    <button className="text-black text-primary display-4"onClick={() => setFilter('verified')}>
      <span style={{ display: 'inline-block', paddingLeft: '30px', borderLeft: '4px solid #007bff' }}>Verified Payments</span>
    </button>
  </div>
  <div className="nav-item" style={{ marginLeft: '20px' }}>
    <button className="text-black text-primary display-4" onClick={() => setFilter('unverified')}>
      <span style={{ display: 'inline-block', paddingLeft: '30px', borderLeft: '4px solid #007bff' }}>Unverified Payments</span>
    </button>
  </div>
  <div className="nav-item" style={{ marginLeft: '20px' }}>
    <button className="text-black text-primary display-4" onClick={() => setFilter('all')}>
      <span style={{ display: 'inline-block', paddingLeft: '30px', borderLeft: '4px solid #007bff' }}>All</span>
    </button>
  </div>
</div>

{error && 
<div className="alert alert-danger mt-3">
<span 
   className="close-icon" 
   style={{ fontSize: '20px', color: 'white', marginLeft: '10px' }}
  >&times;</span>
  {error}
</div>}
{message && 
<div className="alert alert-success mt-3">
<span 
   className="close-icon" 
   style={{ fontSize: '20px', color: 'white', marginLeft: '10px' }}
  >✓  </span>
  {message}
</div>}

  <div className="row">
    <div className="table-responsive">
      <table 
        className="table table-striped" 
        style={{ marginTop: 20, width: '100%', 
          '--bs-table-striped-bg': 
          filter === 'all' ? 'hsla(189, 77%, 85%, 0.833)' : //Changes stripped colour to blue - All Filter
          filter === 'unverified' ? 'hsla(0, 77%, 85%, 0.833)' : //Changes stripped colour to red - Unverified Filter
          filter === 'verified' ? 'hsla(120, 77%, 85%, 0.833)' : //Changes stripped colour to green - Verified Filter
          'initial' //Leaves as default colour if no filter
        }}
      >
        <thead>
          <tr>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>No.</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>User</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Amount</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Currency</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Provider</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Recipient Name</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Recipient Account Number</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Recipient Bank Name</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Recipient Bank Branch Code</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>SWIFT Code</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Verified</th>
            <th style={{ minWidth: '180px', textAlign: 'center', padding: '12px 15px' }}>Actions</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}></th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index}>
             <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{index + 1}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>
                {/* Displaying user data */}
                {users[payment.user] ? users[payment.user].name : payment.user}
              </td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.amount}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.currency}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.provider}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.recipient_name}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.recipient_account_number}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.recipient_bank_name}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.recipient_bank_branch_code}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{payment.swift_code}</td>
             
              {/* Only allows payment verification if payment hasn't been verified */}
              {/* W3Schools (2024) demonstrates the && operator in conditional rendering*/}
              {payment.verified === 'false' && (
              <td style={{ textAlign: 'center', padding: '12px 15px' }}>
                <button onClick={() => handleVerification(payment._id)} className="btn btn-primary btn-sm">
                  Verify
                </button>
              </td>
              )}

              {/* Only shows payment verified if payment has been verified */}
              {payment.verified === 'true' && (
              <td style={{ textAlign: 'center', padding: '12px 15px' }}>
                <button className="btn btn-success btn-sm">
                ✓Verified
                </button>
              </td>
              )}

             {/* Display submit to SWIFT button based on verification and submission status */}
             {/* Purohit (2024) demonstrates how to use the ternary opertor*/}
             <td style={{ textAlign: 'center', padding: '12px 15px' }}>
             {payment.verified === 'true' && payment.submit_swift === 'false' ? (

             //Enables button if verified and not submitted to SWIFT.
            <button onClick={() => handleSubmission(payment._id)} className="btn btn-primary btn-sm">
             Submit to SWIFT
            </button>

            ) : payment.submit_swift === 'true' ? (
            
            //Shows "Submitted" button if already submitted to SWIFT.
            <button className="btn btn-success btn-sm">
            ✓Submitted to SWIFT
            </button>
            ) : (

            //Shows disabled button if not verified yet.
            <button className="btn btn-primary btn-sm" disabled>
            Submit to SWIFT
           </button>
           )}
           </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

</section>

<section className="footer7 cid-umQcqHNF3v">

<div className="container">
    <div className="media-container-row align-center mbr-white">
        <div className="col-12">
            <p className="mbr-text mb-0 mbr-fonts-style display-7">
                © Copyright 2025 RenBank - All Rights Reserved
            </p>
        </div>
    </div>
</div>
</section>

</body> 
);
};

{/* REFERENCE LIST:
freeCodeCamp. 2022. How to Use localStorage with React Hooks to Set and Get Items, 22 February 2022 (Version 1.0)
[Source code] https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
(Accessed 2 October 2024).

Kim, K. 2022. How to Use and Pass Functions as Props— React. Medium, 21 January 2022 (Version 1.0)
[Soure code] https://medium.com/@kkm2059/how-to-use-and-pass-functions-as-props-react-ff677f5bca0b
(Accessed 4 October 2024).

Nawo, A. 2022. Filtering data in React: `filter()`, `map()`, and `for` loops. Retool, 11 Apirl 2022 (Version 1.0)
[Soure code] https://retool.com/blog/filtering-data-in-react-filter-map-and-for-loops
(Accessed 7 November 2024).

Purohit, R. 2024. How to Use the Ternary Operator in React for Cleaner Code. DhiWise, 9 August 2024 (Version 2.0)
[Source code] https://www.dhiwise.com/post/how-to-use-the-ternary-operator-in-react-for-cleaner-code
(Accessed 2 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.

W3Schools. 2024. React Conditional Rendering, 2024 (Version 1.0)
[Source code] https://www.w3schools.com/react/react_conditional_rendering.asp
(Accessed 3 October 2024).

W3Schools. 2024. Window setTimeout(), 2024 (Version 1.0)
[Source code] https://www.w3schools.com/jsref/met_win_settimeout.asp
(Accessed 3 October 2024).

 */}
    