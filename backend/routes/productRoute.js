const express = require("express");
const { getAllProducts, createProduct,updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReview, deleteReview, getAdminProducts} = require("../controller/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);


//create new product-Admin route
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

//Update Product-Admin route //Delete Product --
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct).get(getProductDetails);

//

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser, deleteReview);

module.exports = router;