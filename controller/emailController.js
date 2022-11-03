const sendEmail = require("../utils/sendemail"),
    User = require("../model/User.model"),
    Token = require("../model/Token.model"),
    crypto = require("crypto");

const email = async function (res, user) {
    const token = new Token({
        userID: user._id,
        token: crypto.randomBytes(32).toString("hex")
    });

    try {
        await token.save();

        const url = `
        <h2>${user.username}! welcome to test system</h2>
        <h4>please verify email to continue</h4>
        <a href = "${process.env.BASE_URL}api/user/${user._id}/verify/${token.token}>
        Verify email </a>`;

        // await sendEmail(user.email, "Email verification", url)
        console.log(url)
        res.status(200).send("email sent successfully");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    email
}