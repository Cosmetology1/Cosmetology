const nodemailer = require("nodemailer")

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MONGO_URI,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
    
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        })

        console.log("email sent successfully");
    } catch(error){
        console.log("email not sent", error);
    }
}

module.exports = sendEmail;