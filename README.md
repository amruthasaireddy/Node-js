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

Register User API
Login User API


