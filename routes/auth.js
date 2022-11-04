const express = require("express"),
    authController = require("../controller/authController"),
    verifyEmail = require("../controller/emailController");

const router = express.Router();
// RENDERS UI FOR USER REGISTRATION
router.get("/register", (req, res) => res.render('register'));
// RESPOND TO USER REQUEST
router.post("/register", authController.register);
// VERIFY USER EMAIL
router.get("/:id/verify/:token", verifyEmail.emailVerify);

module.exports = router;