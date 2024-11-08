import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import  '../assets/web/assets/mobirise-icons2/mobirise2.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/socicon/css/styles.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css?v=ZR21yi';

import bannerImage from '../assets/images/banner_home.jpg';
import aboutImage from '../assets/images/banner_about.jpg';
import jarodImage from '../assets/images/jarod_profile.png';
import renierImage from '../assets/images/renier_profile.png';
import rachaelImage from '../assets/images/rachael_profile.jpg';
import mayImage from '../assets/images/may_profile.png';
import devonImage from '../assets/images/devon_profile.png';

//Home() function defines a component for the Home page.
function Home () {

    const [name, setName] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    //Checks if the user is logged in each time the component is navigated to.
    //freeCodeCamp (2022) demonstrates how to use localStorage.
    useEffect(() => {

        //Gets the user's name from localStorage.
        const storedName = localStorage.getItem('name');

        //Gets the user's role from localStorage.
        const storedRole = localStorage.getItem('role');

        //Verifies user's name and role exists.
        if (storedName && storedRole) {

            //Extracts the user's first name from storedName.
            const firstName = storedName.split(' ')[0];
            setName(firstName);
            setRole(storedRole);
        } else {
            setName(null);
            setRole(null);
        }

    }, [navigate]);

{/* Site made with Mobirise Website Builder v5.9.18, https://mobirise.com */}
    return (
    <body> 

{/* Only shows 'Hello <name>' message if user is logged in (authenticated), otherwise shows "Renbank" */}
{/* Purohit (2024) demonstrates how to use the ternary opertor*/}
{
  !name ? (    
    <section className="header14 cid-sFzxmVl7J6">
 <div className="container">
        <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 image-wrapper">
                <img src={bannerImage} alt="Mobirise Website Builder"/>
            </div>
            <div className="col-12 col-md">
                <div className="text-wrapper">
                    <h1 className="mbr-section-title mbr-fonts-style mb-3 display-1"><strong>RenBank</strong></h1>
                    <p className="mbr-text mbr-fonts-style display-7">
                        Welcome to RenBank, where global financial expertise meets personalized service. 
                        As a leading international banking institution, we are dedicated to providing comprehensive 
                        financial solutions and exceptional customer service across the globe.
                    </p>
                    <div className="mbr-section-btn mt-3">
                        {/* The IIE (2024) demonstrates how to use <NavLink> */}
                        <NavLink className="btn btn-secondary display-4" to={'/register'}>Get Started</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
 ) : (

    <section className="header14 cid-sFzxmVl7J6">
    <div className="container">
           <div className="row justify-content-center align-items-center">
               <div className="col-12 col-md-6 image-wrapper">
                   <img src={bannerImage} alt="Mobirise Website Builder"/>
               </div>
               <div className="col-12 col-md">
                   <div className="text-wrapper">
                       <h2 className="mbr-section-title mbr-fonts-style mb-3 display-1"><strong>Hello {name}</strong></h2>
                       <p className="mbr-text mbr-fonts-style display-7">
                           Welcome to RenBank, where global financial expertise meets personalized service. 
                           As a leading international banking institution, we are dedicated to providing comprehensive 
                           financial solutions and exceptional customer service across the globe.
                       </p>
                   </div>
               </div>
           </div>
       </div>
   </section>
    )
}

{/* Our Features Section */}
<section className="features1 cid-sFzyUE9AaP">
      
    <div className="container-fluid">
        <div className="row">
            <div className="col-12 col-lg-9">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>Our Features</strong>
                </h3>
                
            </div>
        </div>
        <div className="row">
            <div className="card col-12 col-md-6 col-lg-3">
                <div className="card-wrapper">
                    <div className="card-box align-center">
                        <div className="iconfont-wrapper">
                            <span className="mbr-iconfont mobi-mbri-globe mobi-mbri"></span>
                        </div>
                        <h5 className="card-title mbr-fonts-style display-5"><strong>International Pay</strong></h5>
                        <p className="card-text mbr-fonts-style display-7">Renbank’s International Pay service 
                            ensures fast, secure, and hassle-free cross-border transactions, allowing you to send 
                            and receive payments globally with confidence.
                        </p>
                    </div>
                </div>
            </div>
            <div className="card col-12 col-md-6 col-lg-3">
                <div className="card-wrapper">
                    <div className="card-box align-center">
                        <div className="iconfont-wrapper">
                            <span className="mbr-iconfont mobi-mbri-cash mobi-mbri"></span>
                        </div>
                        <h5 className="card-title mbr-fonts-style display-5"><strong>Payments Portal</strong></h5>
                        <p className="card-text mbr-fonts-style display-7">Our Payments Portal, managed by our 
                            dedicated staff, ensures that your transactions are carefully handled and securely 
                            verified, providing you with peace of mind. 
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</section>

{/* About Company Section */}
<section className="header14 cid-sFzz5E692j">

    <div className="container">
        <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 image-wrapper">
                <img src={aboutImage} alt="Mobirise Website Builder"/>
            </div>
            <div className="col-12 col-md">
                <div className="text-wrapper">
                    <h1 className="mbr-section-title mbr-fonts-style mb-3 display-2">
                        <strong>About Company</strong></h1>
                    <p className="mbr-text mbr-fonts-style display-7"><br></br>Renbank is committed to making banking easy, especially when it comes to international needs. Our International Pay service provides quick, secure, and seamless cross-border transactions, allowing you to manage your global finances without any hassle. Whether you're sending or receiving money, Renbank is here to ensure your banking experience is smooth and effortless.<br></br></p>
                    
                </div>
            </div>
        </div>
    </div>
</section>


{/* Professional Team Section */}
<section data-bs-version="5.1" className="team1 cid-sFzErVWEaH">
    

    
    <div className="container">
        <div className="row justify-content-center mb-5">
            <div className="col-12">
                <h3 className="mbr-section-title1 mbr-fonts-style align-center mb-5 display-2">
                    <strong>Professional Team</strong>
                </h3>
                
            </div>
            <div className="col-sm-6 col-lg-3 mb-5">
                <div className="card-wrap">
                    <div className="image-wrap">
                        <img src={devonImage} alt="Mobirise Website Builder" height={300} width={250}/>
                    </div>
                    <div className="content-wrap">
                        <h5 className="mbr-section-title card-title mbr-fonts-style align-center m-0 display-5"><strong>Devon Duerholz</strong></h5>
                        <h6 className="mbr-role mbr-fonts-style align-center mb-3 display-4"><strong>Backend Developer</strong></h6>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-lg-3">
                <div className="card-wrap">
                    <div className="image-wrap">
                        <img src={jarodImage} alt="Mobirise Website Builder" height={300} width={250}/>
                    </div>
                    <div className="content-wrap">
                        <h5 className="mbr-section-title card-title mbr-fonts-style align-center m-0 display-5"><strong>Rachael Moreira</strong></h5>
                        <h6 className="mbr-role mbr-fonts-style align-center mb-3 display-4"><strong>Database Manager</strong></h6>
                    </div>
                </div>
            </div>


            <div className="col-sm-6 col-lg-3">
                <div className="card-wrap">
                    <div className="image-wrap">
                        <img src={rachaelImage} alt="Mobirise Website Builder" height={300} width={250}/>
                    </div>
                    <div className="content-wrap">
                        <h5 className="mbr-section-title card-title mbr-fonts-style align-center m-0 display-5"><strong>Mayuran Chettiar</strong></h5>
                        <h6 className="mbr-role mbr-fonts-style align-center mb-3 display-4"><strong>Frontend Developer</strong></h6>                      
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
            <div className="col-sm-6 col-lg-3">
                <div className="card-wrap">
                    <div className="image-wrap">
                        <img src={mayImage} alt="Mobirise Website Builder" height={300} width={250}/>
                    </div>
                    <div className="content-wrap">
                        <h5 className="mbr-section-title card-title mbr-fonts-style align-center m-0 display-5"><strong>Mayuran Chettiar</strong></h5>
                        <h6 className="mbr-role mbr-fonts-style align-center mb-3 display-4"><strong>Backend Developer</strong></h6>                       
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-lg-3">
                <div className="card-wrap">
                    <div className="image-wrap">
                        <img src={renierImage} alt="Mobirise Website Builder" height={300} width={250}/>
                    </div>
                    <div className="content-wrap">
                        <h5 className="mbr-section-title card-title mbr-fonts-style align-center m-0 display-5"><strong>Rachael Moreira</strong></h5>
                        <h6 className="mbr-role mbr-fonts-style align-center mb-3 display-4"><strong>UI/UX Designer</strong></h6>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

{/* Contacts Section */}
<section data-bs-version="5.1" className="contacts2 cid-sFzIA7KGYz" id="contacts2-1r">
    
    <div className="container">
        <div className="mbr-section-head">
            <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Contacts</strong>
            </h3>
            <h4 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-7"><div><br></br></div><div>Feel free to contact us with any questions or queries you may have. We're here to help!</div></h4>
        </div>
        <div className="row justify-content-center mt-4">
            <div className="card col-12 col-md-6">
                <div className="card-wrapper">
                    <div className="image-wrapper">
                        <span className="mbr-iconfont mobi-mbri-phone mobi-mbri"></span>
                    </div>
                    <div className="text-wrapper">
                        <h6 className="card-title mbr-fonts-style mb-1 display-5">
                            <strong>Phone</strong>
                        </h6>
                        <p className="mbr-text mbr-fonts-style display-7"><a href="tel:+12345678910" className="text-primary">(+27) 123 456 67</a>67</p>
                    </div>
                </div>
            </div>
            <div className="card col-12 col-md-6">
                <div className="card-wrapper">
                    <div className="image-wrapper">
                        <span className="mbr-iconfont mobi-mbri-letter mobi-mbri"></span>
                    </div>
                    <div className="text-wrapper">
                        <h6 className="card-title mbr-fonts-style mb-1 display-5">
                            <strong>Email</strong>
                        </h6>
                        <p className="mbr-text mbr-fonts-style display-7">renbankinternational<a href="mailto:info@site.com" className="text-primary">@renbank.com</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="card col-12 col-md-6">
                <div className="card-wrapper">
                    <div className="image-wrapper">
                        <span className="mbr-iconfont mobi-mbri-globe mobi-mbri"></span>
                    </div>
                    <div className="text-wrapper">
                        <h6 className="card-title mbr-fonts-style mb-1 display-5">
                            <strong>Address</strong>
                        </h6>
                        <p className="mbr-text mbr-fonts-style display-7">
                            123 Elm Street, Springfield, SA</p>
                    </div>
                </div>
            </div>
            <div className="card col-12 col-md-6">
                <div className="card-wrapper">
                    <div className="image-wrapper">
                        <span className="mbr-iconfont mobi-mbri-bulleted-list mobi-mbri"></span>
                    </div>
                    <div className="text-wrapper">
                        <h6 className="card-title mbr-fonts-style mb-1 display-5">
                            <strong>Working Hours</strong>
                        </h6>
                        <p className="mbr-text mbr-fonts-style display-7">
                            9:00 - 18:00
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section data-bs-version="5.1" className="footer7 cid-umQcqHNF3v" once="footers" id="footer7-3">

    

    

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

export default Home;
{/* REFERENCE LIST:
freeCodeCamp. 2022. How to Use localStorage with React Hooks to Set and Get Items, 22 February 2022 (Version 1.0)
[Source code] https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
(Accessed 2 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.

Purohit, R. 2024. How to Use the Ternary Operator in React for Cleaner Code. DhiWise, 9 August 2024 (Version 2.0)
[Source code] https://www.dhiwise.com/post/how-to-use-the-ternary-operator-in-react-for-cleaner-code
(Accessed 2 October 2024).
*/}