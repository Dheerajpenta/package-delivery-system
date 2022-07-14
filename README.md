# package-delivery-system

## Table of Content 
- [Introduction](#introduction)
- [developer dependencies](#developer-dependencies)
- [production dependencies](#production-dependencies)
- [Installation](#installation)
- [.env](#env)
- [future updates ?](#future-updates--)

### Introduction
In this project we create a package delivery system mainly applying the below 5 functionalities
- Registration Service
> we will develop signup, login, verification of our user

- Parcel Delivery Service
> collect package details from user like package pickup address, drop of address, length of package etc...

- Payment Service
> after successfully collecting package details we will estimate a cost and ask the user to pay, this functionality inclueds using payment gateway for payments

- Order History & Tracking
> after successful payments we will generate a tracking id which will help to locate our package

- Customer Feedback
> after succesful delivery we will ask the user experience using the feedback form

### Developer Dependencies
> used only while development, not used in production
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ngrok](https://www.npmjs.com/package/ngrok)

### Production Dependencies
> used in production and development
- [express](https://www.npmjs.com/package/express)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [twilio](https://www.npmjs.com/package/twilio)
- [razorpay](https://www.npmjs.com/package/razorpay)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [crypto](https://www.npmjs.com/package/crypto)

### Installation
- clone the project -> [link](https://github.com/Dheerajpenta/package-delivery-system.git)
- run the code snippet in your Terminal
```JavaScript
npm init
```
> it will installs all the packages which are in [package.json](https://github.com/Dheerajpenta/package-delivery-system/blob/main/package.json)

- Create an account in [RazorPay](https://razorpay.com/)
> - follow razorpay [docs](https://razorpay.com/docs/) to know more about razorpay
> - collect KEY_ID, KEY_SECRET, and create a verification secret key 
> - save the secret keys in .env file
> - create a webhook for route **/payment/verifypayment/** for payment catched. (this will run the api **your-host/payment/verifypayment/** after successful payment).
> - follow [razorpay sdk](https://github.com/razorpay/razorpay-node) for knowing the package we are using for payments

> doubts? follow [docs](https://razorpay.com/docs/) or [YouTube](https://www.youtube.com/watch?v=DuL0bwvH1kg)

- Create an account in [Twilio](https://www.twilio.com/)
> - follow twilio [docs](https://www.twilio.com/docs/) to know more about twilio 
> - collect TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, TWILIO_PHONE_NUMBER
> - save the secret keys in .env file
> - follow [twilio package](https://www.twilio.com/docs/verify/api) for knowing the more about the package we are using it for otp sending nd verifying

> doubts? follow [docs](https://www.twilio.com/docs/) or [YouTube](https://www.youtube.com/watch?v=UBjMm_nb45U)

- JWT package
> - you can test your JWT in this [website](https://jwt.io/)
> - create unique secret keys for EMAIL_VERIFICATION, LOGIN, ADMIN_LOGIN
> - save the secret keys in .env file

> doubts? follow [JWT](https://github.com/auth0/node-jsonwebtoken)

- Nodemailer package
> - store your gmail account's USER_ID, USER_PASSWORD in .env
> - we will use these credentials to test our email verification 

> doubts? follow [Nodemailer](https://nodemailer.com/about/)

### .env 
> .env file should contain the following id's
- USER_ID
- USER_PASSWORD
- EMAIL_VERIFICATION 
- LOGIN
- ADMIN_LOGIN
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER_SERVICE_SID 
> this is a service sid of you the service you create in twilio, i named the service as phone number that's why TWILIO_PHONE_NUMBER_SERVICE_SID
- TWILIO_PHONE_NUMBER
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- VERIFY_PAYMENT_SECRET_KEY
> problem with naming ?, find and edit the name of the key where it has been used in the code

> doubts? follow [dotenv](https://www.npmjs.com/package/dotenv)

### future updates  ?
- will try to add google matrix api to fetch exact distance, time form picking up the package to delivering the package
- will try to add admin role 
> as of now user can access all routes
