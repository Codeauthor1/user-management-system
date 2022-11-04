const sendEmail = require("../utils/sendemail"),
    User = require("../model/User.model"),
    Token = require("../model/Token.model"),
    crypto = require("crypto");
/**
 * EMAIL CONTROLLER
 * @function email() -> A FUNCTION TO SEND EMAIL
 * @param {*} res
 * @param {*} user -> "user" COMING FROM THE DATABASE
 */
const email = async function (res, user) {
    // CREATE TOKEN
    const token = new Token({
        userID: user._id,
        token: crypto.randomBytes(32).toString("hex")
    });

    try {
        // SAVE TOKEN TO DATABASE
        await token.save();
        // CREATE A URL
        const url = `
        <h2>${user.username}! welcome to test system</h2>
        <h4>please verify email to continue</h4>
        <a href = "${process.env.BASE_URL}api/user/${user._id}/verify/${token.token}>
        Verify email </a>`;
        // SEND AN EMAIL
        // await sendEmail(user.email, "Email verification", url)
        console.log(url)
        res.status(200).send("email verification sent successfully");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}
/**
 * @function emailVerify() -> A FUNCTION TO VERIFY USER EMAIL
 * @param {*} req
 * @param {*} res 
 */
const emailVerify = async function (req, res) {
    // GET USER "id" AND "token" FROM "req.params"
    const { id, token } = req.params;
    // GET "user" WITH "id" AND "getToken" FROM DATABASE
    const user = await User.findOne({ id: id });
    const getToken = await Token.findOne({ token: token });
    // CHECK IF "user" AND "getToken" EXIST IN DATABASE
    if (!user || user.id !== id) return res.status(400).send("invalid user");
    if (!getToken || getToken.token !== token) return res.status(400).send("invalid token");

    try {
        // UPDATE DATABASE
        await User.updateOne({
            _id: user.id,
            verified: true
        })
        // DELETE "getToken" FROM DATABASE
        await getToken.remove();
        res.status(200).send("Email verified successfully");

    } catch (error) {
        res.status(500).send("Internal server error");
    }
}
module.exports = {
    email,
    emailVerify
}