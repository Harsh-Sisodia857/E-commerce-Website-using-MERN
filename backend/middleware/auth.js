const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Please Login To Access This Resource", 401));
    }
    console.log(token)
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodeData)



    // while creating jwt we gave id, here we access that id -----> jwt.sign({ id: this._id } ......
    req.user = await User.findById(decodeData.id)
    next();
})