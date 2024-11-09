import './App.css';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import InternationalPay from './components/InternationalPay';
import PaymentsPortal from './components/PaymentsPortal';
import Error from './components/Error';
import PaymentCreation from './components/PaymentCreation';
import MyPayments from './components/MyPayments';
import UserManagementHub from './components/UserManagmentHub';
import CreateUser from './components/CreateUser';
import { useEffect, useState } from 'react';


//The IIE (2024) demonstrates how to work with a Navbar and Routes.
//App() function defines the main central point of this application.
function App() {

  const [errorMessage, setErrorMessage] = useState('');

  //triggerError() function sets the error message from other components.
  const triggerError = (message) => {
    setErrorMessage(message);
  };

  return (
    <BrowserRouter>
    <div>
      <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        {/* Passes the error message to the Error page.*/}
        <Route path='/error' element={<Error errorMessage={errorMessage}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* Passes the triggerError function to the InternationalPay and PaymentsPortal page.*/}
        {/* Kim (2022) demonstrates how to use and pass functions as props.*/}
        <Route path='/pay' element={<InternationalPay triggerError={triggerError}/>}/>
        <Route path='/portal' element={<PaymentsPortal triggerError={triggerError}/>}/>
        <Route path='/myPayments' element={<MyPayments triggerError={triggerError}/>}/>
        <Route path='/userManagement' element={<UserManagementHub triggerError={triggerError}/>}/>
        <Route path='/createUser' element={<CreateUser triggerError={triggerError}/>}/>
        <Route path='/paymentProcessing' element={<PaymentCreation/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
{/* REFERENCE LIST:
Kim, K. 2022. How to Use and Pass Functions as Props— React. Medium, 21 January 2022 (Version 1.0)
[Soure code] https://medium.com/@kkm2059/how-to-use-and-pass-functions-as-props-react-ff677f5bca0b
(Accessed 4 October 2024).

The IIE. 2024. LAB GUIDE 2024 [APDS7311 Learn]. The Independent Institute of Education: Unpublished.
*/}