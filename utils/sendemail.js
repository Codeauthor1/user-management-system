const nodemailer = require("nodemailer");
/**
 *SEND EMAIL
 * @function sendEmail() -> A FUNCTION TO SEND EMAIL
 * @param {*} email -> USER'S EMAIL
 * @param {*} subject -> SUBJECT OF THE EMAIL TO BE SENT
 * @param {*} html -> BODY OF EMAIL
 */
const sendEmail = async function (email, subject, html) {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        html: html
    })

}

module.exports = {
    sendEmail
}