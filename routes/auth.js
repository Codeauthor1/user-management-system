const express = require("express"),
    authController = require("../controller/authController");

const router = express.Router();

router.get("/register", (req, res) => res.render('register'))

router.post("/register", authController.register)
router.get("/:id/verify/tpken", authController.register)

module.exports = router