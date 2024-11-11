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

RenBank is an international banking platform designed to provide seamless and secure online payment management. Our system enables users to sign up, manage their payments, and send funds to various bank providers across the globe. Whether you are sending money to friends, family, or business partners, RenBank ensures a smooth and hassle-free transaction experience.

With our user-friendly platform, you can easily select the amount and currency of your choice, and send it to any international bank provider. We have designed RenBank to streamline the process of international payments, providing a reliable and efficient solution for global money transfers.

## Our Mission

The primary goal behind the development of RenBank was to create a secure and reliable internal international payment system that not only simplifies global transactions but also allows for seamless user registration and login. By implementing an intuitive interface for making and verifying international payments, we aim to make cross-border transactions easier and more accessible to everyone.


## Built With
- **Programming Language**: Javascript, HTML, CSS
- **Framework**: Express
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

# RenBank User Guide

## Main Screen
Upon loading into the RenBank site, users are greeted with the main screen. Here, new users can browse the features we provide. Once they’re done, they can create their own account, while existing users can log in.

![Main Screen](https://github.com/user-attachments/assets/18d9a5b7-66dd-4ad6-ab9a-f8c469967ae9)

---

## Customer Workflow

### Register Screen
By clicking the **"Get Started"** button from the Main screen, users are navigated to the Register screen. On this screen, users need to enter their credentials, including their **ID Number**, **Account Number**, and a **Password** of their choice. Once completed, they can create their account by clicking the **Save** button.

![Register Screen](https://github.com/user-attachments/assets/0ba6f946-815f-4370-86ef-7c9e355741df)

### Login Screen
This is the Login Screen where users must enter their **Full Name**, **Account Number**, and their created **Password**. Once completed, they can access their account.

![Login Screen](https://github.com/user-attachments/assets/182877d7-4a73-4776-9020-e2a49bd9df75)

### Main Screen (Logged In)
After logging in, the customer, **"Anne"**, is greeted with a welcome message and can freely browse the main features presented on the navigation bar: **International Pay** and **My Payments**. Customers also have the option to return to the Main Screen or log out.

![Logged In Main Screen](https://github.com/user-attachments/assets/30458e25-a81c-474e-b14e-fee72f99a695)

### International Pay Screen
Upon choosing **International Pay**, customers are navigated to the screen where they can select their custom amount, choose a provider, and select the currency. Once filled in, they click **Continue**, and a details form will display. The customer must enter the recipient’s **Name**, **Account Number**, **Bank Name**, **Branch Code**, and **SWIFT Code**.

![International Pay Screen 1](https://github.com/user-attachments/assets/160862c9-99ce-4c70-af29-988d1e4482e1)  
![International Pay Screen 2](https://github.com/user-attachments/assets/91522e66-16ea-4bb3-bff6-ddff370a8218)  
![International Pay Screen 3](https://github.com/user-attachments/assets/149c9816-837e-4d84-b4bb-3f833892924a)

### My Payment Screen
Once the payment details are finalized, the customer is directed to the **My Payments** screen where they can view their existing and recently made payments.

![My Payment Screen](https://github.com/user-attachments/assets/1bb58a41-2021-4a89-b7f9-c254ab95cee3)

---

## Employee Workflow

Employees use static logins and are pre-registered in the system, but they are still required to log in through the Login Screen.

### Main Screen (Logged In)
After logging in, the employee, **"Matthew"**, is greeted with a welcome message and can browse the main feature: **Payments Portal**. Employees also have the option to return to the Main Screen or log out.

![Employee Main Screen](https://github.com/user-attachments/assets/c5117b2f-e6b8-4046-bd08-577edf993329)

### Payments Portal Screen
When the employee chooses **Payments Portal**, they are taken to a screen where they can view all international payments made by various customers. Filters at the top allow for selecting **All**, **Unverified Payments**, or **Verified Payments**. Each payment can be verified after checking the payee’s account information and SWIFT code by clicking the **"Verify"** button. Once verified, the payment can be submitted to SWIFT by clicking the **"Submit to SWIFT"** button.

![Payments Portal Screen 1](https://github.com/user-attachments/assets/8e0022fb-c47e-46dc-bdc2-5d3291007a16)  
![Payments Portal Screen 2](https://github.com/user-attachments/assets/9fc116ce-9af7-42b7-b5f7-e475d03492ef)  
![Payments Portal Screen 3](https://github.com/user-attachments/assets/4ee667ab-79ac-4a6b-a11e-9ba8990f0696)

---

## Admin Workflow

Admins use static logins and are pre-registered in the system, but they are still required to log in through the Login Screen.

### Main Screen (Logged In)
After logging in, the admin, **"Jamie"**, is greeted with a welcome message and can browse the main features: **User Management Hub** and **Payments Portal**. Admins also have the option to return to the Main Screen or log out.

![Admin Main Screen](https://github.com/user-attachments/assets/0790c15f-6a2e-4465-adaf-73d11c55f99b)

### Payments Portal Screen
This screen operates the same way for Admins as it does for Employees.

### User Management Hub Screen
When the admin selects **User Management Hub**, they are directed to a screen where they can view all RenBank users. Filters at the top allow for selecting **All**, **Admin**, **Employee**, or **Customer**. In this hub, admins can create new users (by clicking **+ New User**), update existing users (by clicking **Update**), and delete user accounts (by clicking **Delete**).

![User Management Hub 1](https://github.com/user-attachments/assets/93e4cfbb-1e91-464e-b74f-92f9646f74d2)  
![User Management Hub 2](https://github.com/user-attachments/assets/2bfe69b1-133e-47d1-a204-0978197de000)  
![User Management Hub 3](https://github.com/user-attachments/assets/134243b3-ef1f-41c0-8e17-39d5e2d4346b)  
![User Management Hub 4](https://github.com/user-attachments/assets/03981e71-9e81-455d-afea-678c44e14ef5)  
![User Management Hub 5](https://github.com/user-attachments/assets/d00c1946-bcbb-4567-8760-c8c580f6bd70)  
![User Management Hub 6](https://github.com/user-attachments/assets/fe7801cd-fea3-491c-8cb6-dffff4025dc1)  
![User Management Hub 7](https://github.com/user-attachments/assets/2093d0c9-ef60-467c-8f34-1c8ba32766b3)



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
