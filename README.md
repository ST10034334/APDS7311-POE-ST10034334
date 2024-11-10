# APDS7311 POE RENBANK README
# Presented by: 
- ST10155387 - Mayuren Chettiar
- ST10034334 - Rachael Moeira
- ST10174534 - Jarod Naidoo
- ST10043202 – Devon Duerholz
- ST10055559 – Renier Coetzer


## Table of Contents
- [Project Description](#project-description)
- [Built With](#built-with)
- [Architypes](#architypes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [How to Use Renbank](#how-to-use-renbank)
- [Renbank Tutorial and Security Videos](#renbank-tutorial-and-security-videos)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Project Description

Our site, RenBank, is an international Bank System that allows users to sign up and have the ability to manage their online payments with other users. RenBank allows you to send your chosen amount to various currencies around the world to any bank provider. With our bank management, users now have ease-of-use when sending to companions without any hassel. <br><br>
Our goal when creating the site was to be able to have internal international payment system, and the ability for user registration and login to making and verifying international
payments.  <br><br>


## Built With
- **Programming Language**: Python + Javascript
- **Framework**: Django + Express
- **Database**: MongoDB
- **Hosting**: Google Cloud
- **Version Control**: Git

## Architypes

![Diagram](https://github.com/VCDN-2024/opsc7312-part-2-ST10034334/blob/main/docs/assets/API_Map_APDS7311_POE.jpg)

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- VS Code
- VS Code Version 1.94
- Basic knowledge of Python programming language

# Installation
To install the project, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/VCDN-2024/apds7311-part-2-ST10034334.git
2. Navigate to project directory:
   ```bash
   cd bank-payment-app
4. Open the project in VS Code.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

# How to Use Renbank

Main Screen: Loading into the RenBank site, users are greeted with the main screen, here new users can browse the features we provide, and once done can make their own account while existing users can log in.<br><br>
![Screenshot 2024-10-08 154959](https://github.com/user-attachments/assets/18d9a5b7-66dd-4ad6-ab9a-f8c469967ae9)

# Customer Workflow:

Register Screen: By clicking on the "Get Started" Button from the Main screen, users are navigated to the Register screen. On this screen users will need to enter their Credentials, including their ID Number and Account Number and a Password of their choice, once completed they can create their account via Save button. <br><br>
![Screenshot 2024-10-08 155016](https://github.com/user-attachments/assets/0ba6f946-815f-4370-86ef-7c9e355741df)

Login Screen: This is the Login Screen where users must enter their Full Name, Account Number and their created Password, once completed they will be allowed to access their account.<br><br>
![Screenshot 2024-10-08 155029](https://github.com/user-attachments/assets/182877d7-4a73-4776-9020-e2a49bd9df75)

Main Screen (Logged In): Now that the customer, "Anne" has logged in, she is greeted with a welcome messeage and is now free to browse the main fetures presented on the navigation bar: International Pay and My Payments. Customers also have the option to return to the Main Screen or Log Out of the account.<br><br>
![Screenshot 2024-10-08 155105](https://github.com/user-attachments/assets/30458e25-a81c-474e-b14e-fee72f99a695)

International Pay Screen: Once the customer chooses International Pay, they are navigated to the screen where they can choose their custom amount,  what provider to send through and their chosen currencey to add. Once they are filled in, click continue and now a details form will display where the customer must now enter a Recipent's Name, Account Number, Bank Name, Branch Code, and lastly the Swift Code. <br><br>
![Screenshot 2024-10-08 155117](https://github.com/user-attachments/assets/160862c9-99ce-4c70-af29-988d1e4482e1) <br><br>
![Screenshot 2024-10-08 155138](https://github.com/user-attachments/assets/91522e66-16ea-4bb3-bff6-ddff370a8218) <br><br>
![Screenshot 2024-10-08 155159](https://github.com/user-attachments/assets/149c9816-837e-4d84-b4bb-3f833892924a) <br><br>

My Payment Screen: Once everything is finalised, the customer is directed to the My Payment Screen where they can view their existing and recently made Payments.<br>
![Screenshot 2024-10-08 155225](https://github.com/user-attachments/assets/1bb58a41-2021-4a89-b7f9-c254ab95cee3)

# Employee Workflow:

Employees use static login and are pre-registered onto the system, but are still required to login through the Login Screen.

Main Screen (Logged In): Now that the employee, "Matthew" has logged in, he is greeted with a welcome messeage and is now free to browse the main fetures presented on the navigation bar: Payments Portal. Employees also have the option to return to the Main Screen or Log Out of the account.<br><br>
![Screenshot 2024-11-10 210854](https://github.com/user-attachments/assets/c5117b2f-e6b8-4046-bd08-577edf993329)

Payments Portal Screen: Once the employee chooses Payments Portal, they are navigated to the screen where they can view all international payments created by various customers. There are filters Each payment has the ability to be verified after the employee has checked the payee account information and SWIFT code, by simply clicking the "Verify" button. Once the payment has been verified, they can now submit this payment to SWIFT by simply clicking the "Submit to SWIFT" button.  <br><br>

![Screenshot 2024-11-10 205845](https://github.com/user-attachments/assets/8e0022fb-c47e-46dc-bdc2-5d3291007a16)
![Screenshot 2024-11-10 205857](https://github.com/user-attachments/assets/9fc116ce-9af7-42b7-b5f7-e475d03492ef)
![Screenshot 2024-11-10 205909](https://github.com/user-attachments/assets/4ee667ab-79ac-4a6b-a11e-9ba8990f0696)
![Screenshot 2024-11-10 205936](https://github.com/user-attachments/assets/93e4cfbb-1e91-464e-b74f-92f9646f74d2)
![Screenshot 2024-11-10 205947](https://github.com/user-attachments/assets/2bfe69b1-133e-47d1-a204-0978197de000)
![Screenshot 2024-11-10 210001](https://github.com/user-attachments/assets/134243b3-ef1f-41c0-8e17-39d5e2d4346b)
![Screenshot 2024-11-10 210012](https://github.com/user-attachments/assets/03981e71-9e81-455d-afea-678c44e14ef5)
![Screenshot 2024-11-10 210022](https://github.com/user-attachments/assets/d00c1946-bcbb-4567-8760-c8c580f6bd70)
![Screenshot 2024-11-10 210039](https://github.com/user-attachments/assets/fe7801cd-fea3-491c-8cb6-dffff4025dc1)
![Screenshot 2024-11-10 210054](https://github.com/user-attachments/assets/2093d0c9-ef60-467c-8f34-1c8ba32766b3)


# Admin Workflow:

Admins use static login and are pre-registered onto the system, but are still required to login through the Login Screen.

Main Screen (Logged In): Now that the admin, "Jamie" has logged in, she is greeted with a welcome messeage and is now free to browse the main fetures presented on the navigation bar: User Management Hub, Payments Portal. Admins also have the option to return to the Main Screen or Log Out of the account.<br>
<img width="959" alt="image" src="https://github.com/user-attachments/assets/0790c15f-6a2e-4465-adaf-73d11c55f99b">



# Renbank Tutorial and Security Videos

Here you can find the Renbank tutorial and security videos: https://drive.google.com/drive/folders/1GDXz_0r__I4BQSrytWcrRwLsJmfrvQmJ?usp=drive_link

# License
This project is licensed under the MIT License. See the LICENSE file for more details.
<p align="right">(<a href="#readme-top">back to top</a>)</p>


# Contact
* Jarod N Naidoo - ST10174534@vcconnect.edu.za
* Racheal Moeira - ST10034334@vcconnect.edu.za
* Mayuren Chettiar - STST10155387@vcconnect.edu.za
* Devon Duerholz - ST10043202@vcconnect.edu.za
* Renier Coetzer - ST10055559@vcconnect.edu.za
<p align="right">(<a href="#readme-top">back to top</a>)</p>


# Acknowledgements
Javascript for the UI toolkit.<br><br>
MongoDB for database management.<br><br>
Google Cloud for Hostong Services.<br><br>
Python and Javascript for the programming language.<br><br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>
