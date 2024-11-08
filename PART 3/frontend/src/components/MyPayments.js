import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/web/assets/mobirise-icons2/mobirise2.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/socicon/css/styles.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css?v=ZR21yi';


//MyPayment() function defines a component for the MyPayment page.
{/* The IIE (2024) demonstrates how to work with retrieving table data - MyPayment Page */}
//This component takes in a triggerError function to trigger the Error page where appropriate.
//Kim (2022) demonstrates how to use and pass functions as props.
export default function MyPayments ({triggerError}) {

    //freeCodeCamp (2022) demonstrates how to use localStorage.
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [role, setRole] = useState(localStorage.getItem('role'));
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);

    //Checks if the user is verified each time the component is navigated to. 
    useEffect(() => {

        //If no token or role, redirects to the login page.
        if (!token || !role) {

            navigate('/login');
          } 
          
         //If role is not 'Customer', shows error and navigates to the error page.
          else if (role !== 'Customer') {

            triggerError('You do not have the right privileges to access this page.');
            navigate('/error');

          } else {

            //Calls getPayments if token and role are valid.
            getPayments();
          }
        }, [token, role, navigate]); 

    //getPayments() function handles displaying the customer's payments made.
    //Uses the 'pay/myPayments' GET endpoint to retrieve the list of payments made by user from database.
    //If successful, sets the payment data accordingly.
    //If not, shows an appropriate error message to the user.
    async function getPayments () {

        try {

            console.log(token)

           //Makes an API request to get the payments.
            const response = await fetch("https://renbank-api.oa.r.appspot.com/pay/myPayments", {
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
            }
            
        }  catch (error) {
            //Sets error message if something goes wrong.
            setError(error)
            return;
        };
    };



    return (
<body> 


<section className="features1 cid-sFzyUE9AaP">

{/* The IIE demonstrates how to create a table with data */}
<div className="container-fluid">
        <div className="row">
            <div className="col-12 col-lg-9">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>My Payments</strong>
                </h3>
                
            </div>
        </div>
        <div className="row">
   <table className='table table-striped' style={{marginTop: 20}}>
    <thead>
        <tr>
            <th>No.</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Provider</th>
            <th>Recipient Name</th>
            <th>Recipient Bank Name</th>
            <th>Verified</th>

        </tr>
    </thead>   
    <tbody>

    {payments.map((payment, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{payment.amount}</td>
            <td>{payment.currency}</td>
            <td>{payment.provider}</td>
            <td>{payment.recipient_name}</td>
            <td>{payment.recipient_bank_name}</td>
             {/* Only shows payment verified if payment has been verified */}
              {/* W3Schools (2024) demonstrates the && operator in conditional rendering*/}
              {payment.verified === 'true' && (
              <td style={{ textAlign: 'center', padding: '12px 15px' }}>
                <button className="btn btn-success btn-sm">
                ✓Verified
                </button>
              </td>
              )}
              {/* Only shows payment processing if payment hasn't been verified */}
              {/* W3Schools (2024) demonstrates the && operator in conditional rendering*/}
              {payment.verified === 'false' && (
              <td style={{ textAlign: 'center', padding: '12px 15px' }}>
                <button className="btn btn-default btn-sm">
                ⚙️Processing
                </button>
              </td>
              )}

        </tr>
    ))}

    </tbody>
    {error && <div className="alert alert-danger">{error}</div>}
   </table>
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

The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.

W3Schools. 2024. Window setTimeout(), 2024 (Version 1.0)
[Source code] https://www.w3schools.com/jsref/met_win_settimeout.asp
(Accessed 3 October 2024).

 */}
    