# Userpage_nodejs
User Authentication with Express, Bcrypt, and Sessions
This is a simple example application that demonstrates user authentication using the Express.js framework, the Bcrypt.js library for password hashing, and the Express-Session middleware for session management.

# Getting Started
To get started, clone this repository to your local machine and install the dependencies using NPM:

$ git clone https://github.com/your-username/express-auth-example.git
$ cd express-auth-example
$ npm install
Next, create a new file called .env in the root of the project and add the following environment variables:

makefile
Copy code
MONGODB_URI=<your-mongodb-uri>
SESSION_SECRET=<your-session-secret>
Replace <your-mongodb-uri> with the URI for your MongoDB database and <your-session-secret> with a random string to use as your session secret.

Running the App
To run the app, start the development server using the following command:

$ npm start
This will start the server on http://localhost:3000.

# Routes
The app has the following routes:

/ - the home page
/signup - the signup page
/login - the login page
/dashboard - the dashboard page (requires authentication)
/logout - logs out the user and destroys the session
User Authentication
The app uses Bcrypt to hash and compare passwords, and Express-Session to manage user sessions. When a user signs up, their password is hashed using Bcrypt and stored in the database. When a user logs in, the app compares the hashed password in the database with the hashed password entered by the user. If the passwords match, the user is authenticated and a session is created.

# License
This project is licensed under the MIT License. See the LICENSE file for details.
