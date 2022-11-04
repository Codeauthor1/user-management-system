/**
 * AUTHETICATOR CONTROLLER
 * @function register() -> A FUNCTION TO REGISTER NEW USER
 */
const User = require("../model/User.model"),
    sendEmail = require("../controller/emailController"),
    regValidator = require("./error"),
    bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    // HASHING PASSWORD
    const hashpassword = await bcrypt.hash(password, await bcrypt.genSalt(Number(process.env.SALT)));
    // ERROR VALIDATION ON USER INPUT
    const { error } = regValidator.regValidator(req);
    if (error) return res.send(error.details[0].message);

    const user = new User({
        username: username,
        email: email,
        password: hashpassword
    });
    // FIND USER FROM DATABASE
    const getUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
    // CHECK IF USERNAME AND EMAIL ALREADY EXIST IN DATABASE
    if (getUser && getUser.username === username) return res.status(400).send("username already exist");
    if (getUser && getUser.email === email) return res.status(400).send("email already exist");

    try {
        // SAVE USER TO DATABASE
        await user.save();
        // SEND AN EMAIL TO NEWELY REGISTERED USER
        await sendEmail.email(res, user);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    register
}