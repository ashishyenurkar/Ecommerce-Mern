const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
//config
dotenv.config({path:"./backend/config/config.env"});
const path = require("path")

const app = express();
const errrorMiddelware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Import..
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);

app.use("/api/v1", user)

app.use("/api/v1", order)

app.use("/api/v1", payment)

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
//Error Handling middelware.
app.use(errrorMiddelware);


module.exports = app;