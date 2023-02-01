# PAPEL
[![Maintainability](https://api.codeclimate.com/v1/badges/38c576278c9ea16aed17/maintainability)](https://codeclimate.com/github/irfiacre/Papel/maintainability)
[![Build Status](https://travis-ci.org/irfiacre/Papel.svg?branch=develop)](https://travis-ci.org/irfiacre/Papel)
[![Coverage Status](https://coveralls.io/repos/github/irfiacre/Papel/badge.svg?branch=develop)](https://coveralls.io/github/irfiacre/Papel?branch=develop)

>Papel is a light-weight core banking application that powers banking operations like account
creation, customer deposits, and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money.

### Live Link 

> Papel' User Interface is hosted on the gh-pages  [Papel](https://papelproj.netlify.app/)

##### N.B
>To sign in as an **Administrator**, use:
>
> - Email: admin@papel.com
> - Password: admin@123
>
>To sign in as a **Cashier**,use:
>
> - Email: cashier@papel.com
> - Password: cashier@123
>
>To sign in as a **User**, use:
>
> - Email: user@papel.com
> - Password: user@123
> - Or any other email and password.

### Features:
> - Sign in and Sign up.
> - Open bank account.
> - View user account dashboard(Transactions history): 
> - Cashier can debit or credit user's bank account. 
> - Administrator can change the status of a user bank account.
> - Administrator can delete a user account
> - Administrator can create  a staff account

### All of the projects endpoints are hosted on [Heroku](https://papel-bank.herokuapp.com)
> For better testing, please make requests using [Postman](https://www.getpostman.com/) 

### Endpoints
|HTTP Method|Endpoint |Description|
|:----------|:---------|:------------|
|POST |/auth/signup | allows the user to create an account|
|POST |/auth/signin | allows the user to sign in |
|POST|/accounts| allows the User to create a bank account
|PATCH |/account/:accountNo  |allows the admin to activate/dormant a bank account
|POST  |/transactions/:accountNo/credit| allows the cashier to deposit for a users bank account 
|POST  |/transactions/:accountNo/debit| allows the cashier to withdraw for a users bank account 
|GET|/user/:userEmail/accounts|allows a user to his/her own accounts
|GET |/accounts/:accountNo|allows the user to view his/her own specific bank account
|GET |/accounts/:accountNo/transactions| allows the user to view all transactions on a specific account
|GET |/transactions/:transactionId| allows the user to view a specific transaction on a specific account
|GET |/accounts|allows the admin to view all accounts in the database.
|GET |/accounts?status=active|allows the admin to view all active accounts in the database.
|GET |/accounts?status=dormant|allows the admin to view all dormant accounts in the database.
|POST |/auth/create|allows the admin to create a staff account.
|DELETE |/accounts/:accountNo|allows the admin to delete a specific bank account
|POST |/reset|allows the user to reset their password.

*`NB: accountNo : account number`*

### Prerequisites :

- Clone this project with `https://github.com/irfiacre/Papel.git`
- Head to project directory

#### UI
 - Navigate to the *index.html* file.
 - Open the file in your browser preferably `Google chrome`.
 - Since these HTML and CSS based pages that can be run directly in your browser.


#### API-Endpoints
 ##### Installation
> After clone open this in your code editor preferably Vs code.
> -  `$ cd papel`
> - `$ npm install`
>

 ##### To run the endpoints
 > `npm run dev`

 ##### To learn the tests
 > `npm test`

### Technologies used:

>UI      

> - HTML    
> - CSS   
> - JAVASCRIPT 

> Backend-API

>- NodeJS/Express
>- PostgreSQL 
>- Mocha chai
>- TRAVIS CI

### Project Management

> Project Mangement fo Papel is done using  [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2432180)

### Author 

[IRADUKUNDA Allelua Fiacre](https://github.com/irfiacre)
