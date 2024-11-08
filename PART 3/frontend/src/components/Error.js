import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/web/assets/mobirise-icons2/mobirise2.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/socicon/css/styles.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css?v=ZR21yi';

 //Error() function defines a component for the Error page.
 //This component takes in the error message set by other components in order to display
 //the appropriate error message to the user.
export default function Error ({errorMessage}) {

{/* Site made with Mobirise Website Builder v5.9.18, https://mobirise.com */}
    return (
<body> 
<br></br>
<br></br>

{/* Error Icon and Message */}
<section className="form5 cid-umQlCBzxzA">   
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 content-head">

                <div className="mbr-section-head mb-5">
                    {/* W3Schools (2024) demonstrates inline styling with CSS */}
                <h1 style={{ fontSize: '64px', textAlign: 'center', marginBottom: '20px' }}>⚠️</h1>
                    <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-5"><strong>{errorMessage}</strong></h3>
                    
                </div>
            </div>
        </div>

    </div>
</section>
</body>
);
};
{/* REFERENCE LIST:
W3Schools. 2024. Styling React Using CSS, 2024 (Version 1.0)
[Source code] https://www.w3schools.com/react/react_css.asp
(Accessed 5 October 2024).
*/}