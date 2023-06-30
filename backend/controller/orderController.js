const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Create new Order;

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
   

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });
   


    res.status(201).json({
        success: true,
        order,
    })

});

//get Single order.

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    //find by id and there is a user property in order product document *populate goes to the user document and get the name and email from user document.
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler(`No such order found with that ID`, 404));
    };

    res.status(200).json({
        success: true,
        order,
    })
});

//get logged in user Orders.
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler(`${req.user.name} you does not placed any order!`, 404));
    };

    res.status(200).json({
        success: true,
        orders,
    })
});

//get all orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
});

//Update Order Status --Admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 400));
    }


    //check for valid status change request
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }
 
    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    };

    await order.save({validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});

async function updateStock(id, quantity) {
  
    const product = await Product.findById(id);
    product.stock -= quantity;
    

    await product.save({ validateBeforeSave: false });
};

//delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 400));
    }

    await order.deleteOne();

    res.status(200).json({
        success:true,
    })
})

