(() => {
    const express = require("express"),
        mongoose = require("mongoose");


    const app = express();
    require("dotenv").config();


    mongoose.createConnection(
        process.env.DB,
        { useNewUrlParser: true },
        () => console.log("connected to database successfully"))

    app.listen(process.env.PORT, () => console.log(`server is running at port${process.env.PORT}`))
})();