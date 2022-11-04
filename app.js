const express = require("express"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    authRoute = require("./routes/auth");

require("dotenv").config();

const app = express();

app.use(express.json())
app.use(cors())
app.set('view engine', "ejs")

app.use("/api/user", authRoute);

try {
    mongoose.connect(
        process.env.MONGO_DB,
        { useNewUrlParser: true },
        () => console.log("connected to database successfully"))
} catch (err) {
    console.log(err);
}
app.listen(process.env.PORT, () => console.log(`server is running at port ${process.env.PORT}`))