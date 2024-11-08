import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/web/assets/mobirise-icons2/mobirise2.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/socicon/css/styles.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css?v=ZR21yi';

import renbankLogo from '../assets/images/renbank_logo.png';

 //Navbar() function defines a component for the Navigation Bar.
function Navbar() {

    const [name, setName] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
  
    //Checks if the user is verified each time the component is mounted.
    //The IIE (2024) demonstrates how to save data in localStorage.
    useEffect(() => {

      //Gets the user's name and role from localStorage.
      const storedName = localStorage.getItem('name');
      const storedRole = localStorage.getItem('role');
  
      //Sets the appropriate states from localStorage if the data exists and starts the timer.
      if (storedName && storedRole) {
        startTimer();
        setName(storedName);
        setRole(storedRole);
      }
    });


    //startTimer() function keeps the frontend user session active for 1 hour.
    const startTimer = () => {

    //W3Schools (2024) demonstrates the setTimeout() function.
    setTimeout(() => {
        Logout();
      }, 3900000); 
    }
  
    //Handles logout by removing the necessary items from localStorage.
    const Logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('name');

        //Updates state immediately.
        setName(null);
        setRole(null);

      //Navigates back to the Home page and reloads the window.
      navigate("/");
      window.location.reload();
    };
    
 {/* Site made with Mobirise Website Builder v5.9.18, https://mobirise.com */}
    return (
        <section className="menu menu2 cid-sFCw1qGFAI">
    
        <nav className="navbar navbar-dropdown navbar-expand-lg">
            <div className="container">
                <div className="navbar-brand">
                    
                <img src={renbankLogo} alt="Mobirise Website Builder" height={70} width={90}/>
                </div>

                <div className="collapse navbar-collapse">

                <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">
                            {/* The IIE (2024) demonstrates how to use <NavLink> */}
                            <NavLink className="nav-link link text-black text-primary display-4" to="/">Home</NavLink>
                            </li>
                    </ul>

                    {/* Only shows logout if user is logged in (authenticated) */}
                    {/* W3Schools (2024) demonstrates the && operator in conditional rendering*/}
                    {name && (
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">
                            {/* The IIE (2024) demonstrates how to use <NavLink> */}
                            <NavLink className="nav-link link text-black text-primary display-4"  onClick={Logout}>Logout</NavLink>
                            </li>
                    </ul>
                    )}

                   {/* Only shows login menu item if user is not logged in (unauthenticated) */}
                    {!name && (
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">
                            {/* The IIE (2024) demonstrates how to use <NavLink> */}
                            <NavLink className="nav-link link text-black text-primary display-4" to="/login">Login</NavLink>
                            </li>
                    </ul>
                    )}

                     {/* Only shows international pay menu item if user is logged in and their role is "Customer" */}
                     {name && role === "Customer" && (
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">
                            {/* The IIE (2024) demonstrates how to use <NavLink> */}
                            <NavLink className="nav-link link text-black text-primary display-4" to="/pay">International Pay</NavLink>
                            </li>
                    </ul>
                     )}

                    {/* Only shows my payments if user is logged in (authenticated) */}
                    {/* W3Schools (2024) demonstrates the && operator in conditional rendering*/}
                    {name && role === "Customer" && (
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">
                            {/* The IIE (2024) demonstrates how to use <NavLink> */}
                            <NavLink className="nav-link link text-black text-primary display-4"  to="/myPayments">My Payments</NavLink>
                            </li>
                    </ul>
                    )}


                     {/* Only shows user management hub menu item if user is logged in and their role is "Admin" */}
                     {name && role === "Admin" && (
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">
                            {/* The IIE (2024) demonstrates how to use <NavLink> */}
                            <NavLink className="nav-link link text-black text-primary display-4" to="/userManagement">User Management Hub</NavLink>
                            </li>
                    </ul>
                    )}


                    {/* Only shows portal menu item if user is logged in and their role is "Employee"/"Admin" */}
                    {name && (role === "Employee" || role === "Admin") && (
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">
                            {/* The IIE (2024) demonstrates how to use <NavLink> */}
                            <NavLink className="nav-link link text-black text-primary display-4" to="/portal">Payments Portal</NavLink>
                            </li>
                    </ul>
                    )}

                     {/* Only "Get Started" menu item if user is not logged in (unauthenticated) */}
                     {!name && (               
                    <div className="navbar-buttons mbr-section-btn">
                        {/* The IIE (2024) demonstrates how to use <NavLink> */}
                        <NavLink className="btn btn-primary display-4" to='/register'>Get Started</NavLink>
                    </div>
                    )}
                </div>
            </div>
        </nav>
    </section>
    );

};

export default Navbar;

{/* REFERENCE LIST:
    
The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.

W3Schools. 2024. React Conditional Rendering, 2024 (Version 1.0)
[Source code] https://www.w3schools.com/react/react_conditional_rendering.asp
(Accessed 3 October 2024).

W3Schools. 2024. Window setTimeout(), 2024 (Version 1.0)
[Source code] https://www.w3schools.com/jsref/met_win_settimeout.asp
(Accessed 3 October 2024).
*/}