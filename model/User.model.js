const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            required: true,
            type: String,
            unique: true,
            min: 3,
            max: 257
        },
        email: {
            required: true,
            type: String,
            unique: true,
            min: 3,
            max: 257
        },
        password: {
            required: true,
            type: String,
            unique: true,
            min: 3,
            max: 257
        },
        verified: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true },
    { collections: "USERS" }
);

module.exports = mongoose.model("User", userSchema);