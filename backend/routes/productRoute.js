const express = require("express");
const router = express.Router();
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route('/product').get( getAllProducts)
router.route('/product/new').post(isAuthenticatedUser, createProduct);
router.route('/product/:id').put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(getProductDetails)
module.exports = router;