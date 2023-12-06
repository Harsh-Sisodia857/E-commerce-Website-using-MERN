const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors')


exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = catchAsyncError(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("PRODUCT NOT FOUND", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("PRODUCT NOT FOUND", 404))
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: `Product Deleted Successfully with ${req.params.id}`
    })
})

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("PRODUCT NOT FOUND", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})