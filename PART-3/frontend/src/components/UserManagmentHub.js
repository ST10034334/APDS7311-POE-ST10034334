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


//UserManagementHub() function defines a component for the UserManagementHub page.
{/* The IIE (2024) demonstrates how to work with retrieving table data - UserManagementHub Page */}
//This component takes in a triggerError function to trigger the Error page where appropriate.
//Kim (2022) demonstrates how to use and pass functions as props.
function UserManagementHub ({triggerError}) {

    //freeCodeCamp (2022) demonstrates how to use localStorage.
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [role, setRole] = useState(localStorage.getItem('role'));
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');

    //Checks if the user is verified each time the component is navigated to. 
    useEffect(() => {

        //If no token or role, redirects to the login page.
        if (!token || !role) {

            navigate('/login');
          } 
          
         //If role is not 'Admin', shows error and navigates to the error page.
          else if (role !== 'Admin') {

            triggerError('You do not have the right privileges to access this page.');
            navigate('/error');

          } else {

            //Calls getAllUsers if token and role are valid.
            getAllUsers();
          }
        }, [token, role, navigate]); 

    //getAllUsers() function handles displaying all users present.
    //Uses the 'user/' GET endpoint to retrieve the list of users created from database.
    //If successful, sets the user data accordingly.
    //If not, shows an appropriate error message to the user.
    async function getAllUsers () {

        try {

            console.log(token)

           //Makes an API request to get the users.
            const response = await fetch("https://renbank-api.oa.r.appspot.com/user/", {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                },
            });

            console.log(response.status)

            //Sets error message if retrieval fails.
            if (!response.ok) {

             setError('User Retrieval failed: ' + response.statusText );

             //Clears the error message after 3 seconds.
            //W3Schools (2024) demonstrates the setTimeout() function.
             setTimeout(() => setError(''), 3000);
            }
            else{
                
                const users = await response.json();
                setUsers(users);
            }
            
        }  catch (error) {
            //Sets error message if something goes wrong.
            setError(error)
            return;
        };
    };

 //filteredUsers constant filters users based on the selected role status.
 //Nawo (2022) demonstrates how to use the array filter() method.
 const filteredUsers = users.filter(user => {

    if (filter === 'admin') {
      return user.role === 'Admin';
    } else if (filter === 'employee') {
      return user.role === 'Employee';
    }else if (filter === 'customer') {
      return user.role === 'Customer';
    }

    //Shows all users.
    return filter === 'all'
  });

//handleCreation() function navigates to the CreateUser page.
function handleCreation () {
   navigate('/createUser')
  };

//handleUpdate() function navigates to the UpdateUser page and passes the selected user's data.
function handleUpdate (user) {
  console.log("USER DATA: " + user.name)
  navigate('/updateUser', { state: { user } });

}; 

//handleDeletion() function handles removing a user from the database.
//First, confirms removal, gets user ID from the user data, and attempts to
//use the 'user/removeUser' DELETE endpoint to delete the user in database.
//If successful, shows an appropriate message to the user.
//If not, shows an appropriate error message to the user.
async function handleDeletion (user){
 console.log(user._id)
  
  //Confirms deletion of the user before proceeding.
  //GeeksForGeeks (2024) demonstrates the Window confirm() method.
  const confirmation = window.confirm(`Are you sure you want to remove ${user.name}?`);

   //Proceeds with the deletion logic if confirmed.
    if (confirmation) {

      try {
        
        //Makes an API request to delete the user.
        const response = await fetch( `https://renbank-api.oa.r.appspot.com/user/removeUser`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            },
  
            //Sends the user ID in JSON format.
            body: JSON.stringify({ userID: user._id }),
          }
        );
  
        //Sets error message if user fails.
        if (!response.ok) {
          setError("User deletion failed. Please try again.");
  
          //Clears the error message after 3 seconds.
          //W3Schools (2024) demonstrates the setTimeout() function.
          setTimeout(() => setError(""), 3000);
  
        } else {
          setMessage("User Removal Successful!");
  
          //Clears the error message after 3 seconds.
          //W3Schools (2024) demonstrates the setTimeout() function.
          setTimeout(() => setMessage(""), 3000);
        }
      } catch (error) {
  
        //Sets error message if something goes wrong.
        setError(error);
        return;
      }

    } else {
      // Cancel deletion
      console.log("Deletion canceled");
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
        <strong>RenBank Users</strong>
      </h3>
    </div>
  </div>

   {/* Handles all the filters for the table */}
  <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '0' }}>
  <div className="nav-item">
    <button className="text-black text-primary display-4"onClick={() => setFilter('admin')}>
      <span style={{ display: 'inline-block', paddingLeft: '30px', borderLeft: '4px solid #007bff' }}>🌟Admin</span>
    </button>
  </div>
  <div className="nav-item" style={{ marginLeft: '20px' }}>
    <button className="text-black text-primary display-4" onClick={() => setFilter('employee')}>
      <span style={{ display: 'inline-block', paddingLeft: '30px', borderLeft: '4px solid #007bff' }}>🛠️Employee</span>
    </button>
  </div>
  <div className="nav-item" style={{ marginLeft: '20px' }}>
    <button className="text-black text-primary display-4" onClick={() => setFilter('customer')}>
      <span style={{ display: 'inline-block', paddingLeft: '30px', borderLeft: '4px solid #007bff' }}>👥Customer</span>
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
  >&times;  </span>
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


<button onClick={() => handleCreation()} className="btn btn-warning btn-sm">
  + New User
</button>

  <div className="row">
    <div className="table-responsive">
      <table 
        className="table table-striped" 
        style={{ marginTop: 20, width: '100%', 
          '--bs-table-striped-bg': 
          filter === 'all' ? 'hsla(189, 77%, 85%, 0.833)' : //Changes stripped colour to blue - All Filter
          filter === 'admin' ? 'hsla(0, 77%, 85%, 0.833)' : //Changes stripped colour to red - Admin Filter
          filter === 'employee' ? 'hsla(39, 100%, 85%, 0.833)' : //Changes stripped colour to yellow/orange - Employee Filter
          filter === 'customer' ? 'hsla(120, 77%, 85%, 0.833)' : //Changes stripped colour to green - Customer Filter
          'initial' //Leaves as default colour if no filter
        }}
      >
        <thead>
          <tr>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Name</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>ID Number</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Account Number</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Password</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Role</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>Actions</th>
            <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{user.name}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{user.id_number}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{user.account_number}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{user.password}</td>
              <td style={{ minWidth: '150px', textAlign: 'center', padding: '12px 15px' }}>{user.role}</td>
              {/* Update Button */}
              <td style={{ textAlign: 'center', padding: '12px 15px' }}>
                <button onClick={() => handleUpdate(user)} className="btn btn-primary btn-sm">
                  Update
                </button>
              </td>
              {/* Delete Button */}
              <td style={{ textAlign: 'center', padding: '12px 15px' }}>
              <button onClick={() => handleDeletion(user)} className="btn btn-secondary btn-sm">
                Delete
              </button>
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

export default UserManagementHub;

{/* REFERENCE LIST:
freeCodeCamp. 2022. How to Use localStorage with React Hooks to Set and Get Items, 22 February 2022 (Version 1.0)
[Source code] https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
(Accessed 2 October 2024).

GeeksForGeeks. 2024. Javascript Window confirm() Method, 20 August 2024 (Version 2.0)
[Source code] https://www.geeksforgeeks.org/javascript-window-confirm-method/
(Accessed 9 November 2024).

Kim, K. 2022. How to Use and Pass Functions as Props— React. Medium, 21 January 2022 (Version 1.0)
[Soure code] https://medium.com/@kkm2059/how-to-use-and-pass-functions-as-props-react-ff677f5bca0b
(Accessed 4 October 2024).

Nawo, A. 2022. Filtering data in React: `filter()`, `map()`, and `for` loops. Retool, 11 Apirl 2022 (Version 1.0)
[Soure code] https://retool.com/blog/filtering-data-in-react-filter-map-and-for-loops
(Accessed 7 November 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.

W3Schools. 2024. React Conditional Rendering, 2024 (Version 1.0)
[Source code] https://www.w3schools.com/react/react_conditional_rendering.asp
(Accessed 3 October 2024).

W3Schools. 2024. Window setTimeout(), 2024 (Version 1.0)
[Source code] https://www.w3schools.com/jsref/met_win_settimeout.asp
(Accessed 3 October 2024).

 */}
    