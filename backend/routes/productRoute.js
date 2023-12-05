const express = require("express");
const router = express.Router();
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controller/productController")

router.route('/product').get(getAllProducts)
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)
module.exports = router;