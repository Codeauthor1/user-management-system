const express = require("express"),
    authRoute = require("./routes/auth"),
    cors = require("cors"),
    mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.set('view engine', "ejs")
app.use("/user", authRoute);
app.use(cors())
app.use(express.json())


mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true },
    () => console.log("connected to database successfully"))

app.listen(process.env.PORT, () => console.log(`server is running at port ${process.env.PORT}`))