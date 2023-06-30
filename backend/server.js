const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({path:"./backend/config/config.env"});
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")

//Handle Uncought Exception..
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    server.close(() => {
        process.exit(1);
    });
});

//database..
connectDatabase()

//Cloudinary Config...
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});



app.get("/", (req, res) => {
    res.send("hi this is my ecommerce website !")
})
const server = app.listen(process.env.PORT, () => {
    console.log(`server is started on port ${process.env.PORT}`)
});

//unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandle Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});