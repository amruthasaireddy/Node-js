# Node-js
1.Today's Date

A simple Express.js application that displays the current date when a user visits the home route.

Features
Built with Express.js
Returns the current date in a readable format
Lightweight and easy to understand

2.REST APIs
REST: Representational State Transfer

REST is a set of principles that define how Web standards, such as HTTP and URLs, are supposed to be used.

 Why Rest Principles?
Using Rest Principles improves application in various aspects like scalability, reliability etc

REST API Principles
.Providing unique ID to each resource
.Using standard methods like GET, POST, PUT, and DELETE
.Accept and Respond with JSON

1. Installing Third-party package bcrypt
Storing the passwords in plain text within a database is not a good idea since they can be misused, So Passwords should be encrypted

bcrypt package provides functions to perform operations like encryption, comparison, etc

bcrypt.hash() uses various processes and encrypts the given password and makes it unpredictable
bcrypt.compare() function compares the password entered by the user and hash against each other
Installation Command
root@123:~/myapp# npm install bcrypt --save
2. Goodreads APIs for Specified Users
We need to maintain the list of users in a table and provide access only to that specified users

User needs to be registered and then log in to access the books

register API
Login API
1. Authentication Mechanisms
To check whether the user is logged in or not we use different Authentication mechanisms

Commonly used Authentication mechanisms:

Token Authentication
Session Authentication
2. Token Authentication mechanism
We use the Access Token to verify whether the user is logged in or not

2.1 Access Token
Access Token is a set of characters which are used to identify a user

Example:

It is used to verify whether a user is Valid/Invalid

2.2 How Token Authentication works?
Server generates token and certifies the client
Client uses this token on every subsequent request
Client don’t need to provide entire details every time
3. JWT
JSON Web Token is a standard used to create access tokens for an application
This access token can also be called as JWT Token

3.1 How JWT works?
Client: Login with username and password
Server: Returns a JWT Token
Client: Sends JWT Token while requesting
Server: Sends Response to the client

3.2 JWT Package
jsonwebtoken package provides jwt.sign and jwt.verify functions

jwt.sign() function takes payload, secret key, options as arguments and generates JWTToken out of it
jwt.verify() verifies jwtToken and if it’s valid, returns payload. Else, it throws an error

root@123root@123:.../myapp# npm install jsonwebtoken

 


