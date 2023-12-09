const express = require("express");
const router = express.Router();
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route('/product').get(isAuthenticatedUser, getAllProducts)
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)
module.exports = router;