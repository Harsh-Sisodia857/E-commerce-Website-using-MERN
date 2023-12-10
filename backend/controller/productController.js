const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');


exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount
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

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    // Updating the review
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                rev.comment = comment
            };
        });
        // User is giving review for first time    
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // Overall Rating
    let sum = 0;

    product.reviews.forEach((rev) => {
        sum += rev.rating;
    });
    // Average of all ratings
    product.rating = sum / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Product review Successfully Posted"
    });
});

// Get all review of a product

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });

})

// Delete Review

exports.deleteReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    const reviews = product.reviews.filter((rev) => {
        rev._id.toString() !== req.query.id.toString()
    })
    // Changing Overall Rating
    let sum = 0;

    reviews.forEach((rev) => {
        sum += rev.rating;
    });

    const ratings = sum / reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(200).json({
        success: true,
        message: "Product Review Deleted Successfully"
    });

})