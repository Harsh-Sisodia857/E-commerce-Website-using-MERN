const catchAsyncError = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const errorHandler = require('../utils/errorHandler')


exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profileUrl"
        }
    })

    const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        user,
        token
    })
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    const token = user.getJWTToken();
    res.status(200).json({
        success: true,
        user,
        token
    })

})