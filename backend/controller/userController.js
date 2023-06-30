const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register  a User..

exports.registerUser = catchAsyncErrors(
    async (req, res, next) => {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            transformation: [
              { width: 150, crop: "scale" }
            ]
          });

        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: "This is sample id",
                url: myCloud.secure_url,
            }
        });
        //method made for short a res code.
        sendToken(user, 201, res);
    });

    //Login User Route..
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //checking if user has given password and email both.
    if (!email || !password) {
        return next(new ErrorHandler("please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    //If user not Registered
    if (!user) {
        return next(new ErrorHandler("invalid User not Found", 401))
    }
    //checking if password is correct or not.
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid Email or Password", 401))
    };
    
   //method made for short a res code.
   sendToken(user, 200, res);    
});
 
//Logout User.

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "logged out succesfully",
    });
});

//Forgot Password.
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 400));

    }
    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false });
    //Create ResetPassword URL
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    console.log("reseturl", resetPasswordUrl)

    const message = `Your password reset token is:-${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
        
    }
});


//Reset Password.
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))
    };
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

//Get User Detail.
exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
});

//Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    //Check Current Password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) { 
        return next(new ErrorHandler("old Password is incorrect", 400))
    };
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match", 400))
    };
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

//Update User Profile.
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    //we will add cloudinary later.

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            transformation: [
              { width: 150, crop: "scale" }
            ]
        });
        
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url:myCloud.secure_url,
        }
        
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
   
    res.status(200).json({
        success: true,
    })
});

//Get All User.
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find();

    if (!user) { 
        return next(
            new ErrorHandler(`No Users Found`,400)
        );
    };

    res.status(200).json({
        success: true,
        user,
    })
})


//Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`user does not exist with id: ${req.params.id}`,400)
        );
    };

    res.status(200).json({
        success: true,
        user,
    })
});



//Update User Role--Admin.
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role,
    };
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    if (!user) {
        return next(
            new ErrorHandler(`user does not exist with id: ${req.params.id}`,400)
        );
    };
   
    res.status(200).json({
        success: true,
    })
});

//Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    //we will remove cloudinary later.

    if (!user) {
        return next(
            new ErrorHandler(`user does not exist with id: ${req.params.id}`,400)
        );
    };

    await user.deleteOne()
    res.status(200).json({
        success: true,
        message:`User ${user.name} delete succesfully`
    })
 })