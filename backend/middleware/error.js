const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
//Wrong MongoDb Id error.
    if (err.name==="CastError") {
        const message = `Resource Not found Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    };

//Mongoose duplicate key error.
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);
    }
    //Wrong jwt error.
    if (err.name === "jsonWebTokenError") {
        const message = `Json web Token is Invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }

    //JWT expire Error.
    if (err.name === "TokenExpireError") {
        const message = `json web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
        
        
    })
}