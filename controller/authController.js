const User = require("../model/User.model"),
    sendEmail = require("../controller/emailController"),
    regValidator = require("./error"),
    bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, await bcrypt.genSalt(Number(process.env.SALT)));

    const { error } = regValidator.regValidator(req);
    if (error) return res.send(error.details[0].message);

    const user = new User({
        username: username,
        email: email,
        password: hashpassword
    });

    const getUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

    if (getUser && getUser.username === username) return res.status(400).send("username already exist");
    if (getUser && getUser.email === email) return res.status(400).send("email already exist");

    try {
        await user.save();
        await sendEmail.email(res, user);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    register
}