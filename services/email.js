// dependencies 
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// configuring dotenv
dotenv.config()

// sending email for verification
exports.sendVerificationEmail = async(data, url) => {

    // used for sending mail through nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_ID,
            pass: process.env.USER_PASSWORD,
        }
    });

    // token for verification
    const token = jwt.sign(
        {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
        },
        process.env.EMAIL_VERIFICATION,
        {
            expiresIn: "300000"  // 5 min
        },
    );
    console.log(token);
    // link sent in mail
    const link = url+token;
    
    // mail contents 
    let mailOptions = {
        from : process.env.USER_ID,
        to : data.email,
        subject : "Email Verification",
        text : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">link</a>"
    };
    
    // sending mail
    return await transporter.sendMail(mailOptions);
};