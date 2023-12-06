const catchAsyncError = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');
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
    res.status(200).json({
        success: true,
        user,
        token
    })
});