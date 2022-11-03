const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        unique: true,
        require: true
    },
    token: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600 //1 HOUR
    }
});

module.exports = mongoose.model("Token", tokenSchema);