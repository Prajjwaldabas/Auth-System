# Node.js Authentication System with Passport Local and Passport Google OAuth


This repository contains a Node.js authentication system built with Passport Local and Passport Google OAuth using Express. The authentication system allows users to sign up and log in to the application using their email and password or their Google account.

## Getting Started
### Installation
Clone this repository to your local machine using the following command:

git clone https://github.com/Prajjwaldabas/Auth-System.git

### Navigate to the directory where you cloned the repository and run the following command to install the dependencies:


npm install
Configuration
Create a .env file in the root directory of the project and add the following variables:

GOOGLE_CLIENT_ID=<your_google_client_id>


GOOGLE_CLIENT_SECRET=<your_google_client_secret>


SESSION_SECRET=<your_session_secret>


Replace <your_google_client_id>, <your_google_client_secret>, and <your_session_secret> with your own values.

### Usage
Start the server by running the following command:

### sql

npm start
The server should now be running on http://localhost:8000.

### Sign Up
To sign up for the application, go to http://localhost:8000/signup and enter your email and password. Once you submit the form, your information will be saved to the database and you'll be redirected to the login page.

### Log In
To log in to the application, go to http://localhost:8000/login and enter your email and password. If your credentials are correct, you'll be redirected to the home page.

### Log In with Google
To log in to the application with your Google account, click on the "Log In with Google" button on the login page. You'll be redirected to a Google login page where you can enter your credentials. If your credentials are correct, you'll be redirected back to the application and logged in.

### Technologies Used
This authentication system uses the following technologies:

Node.js
Express
Passport Local
Passport Google OAuth
MongoDB with Mongoose

### Contributors
This authentication system was created by Prajjwal Chaudhary.

### License
This project is licensed under the MIT License. See the LICENSE file for more information.
