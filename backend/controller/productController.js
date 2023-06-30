const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorhandler");



//Create Product..Admin-Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        message: "product create succesfully",
        product
    })
});




//Get All Products.
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

    //Pagination Logic & price filter pagination
    const products = await apiFeature.query;
    
    
    res.status(200).json({
        success: true,
        message: "Allproducts get succesfully",
        products,
        productsCount,
        resultPerPage,
       
    });
});


//Update Product --Admin.

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "product update succesfully",
        product
    })
});


//Delete Product-Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product Deleted succesfully"
    })
});

//get Product Details..
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Product getProductDetails succesfully",
        product,
        
    })
});

//Create New Review or update the review.
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) { 
        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment)
            }
        })
        
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating;
    }) 

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success:true,
    })
});

//Get All Reviews of a product.

exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("product not found"), 404);
    };

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
});

//Delete Review.
exports.deleteReview = catchAsyncErrors(async (req, res, next) => { 
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("product not found"), 404);
    };
   
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
  
    let avg = 0;
    if (reviews.length > 0) {
        reviews.forEach((rev) => {
          avg += rev.rating;
        });
        avg /= reviews.length;
      }
    
      const ratings = isNaN(avg) ? 0 : avg;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success:true,
    })
})