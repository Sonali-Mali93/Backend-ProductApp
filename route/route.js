const express = require("express");
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const mid = require('../middleware/middlware')

const router = express.Router();

router.post("/register", userController.userResistration);

router.post("/login", userController.loginUser);

router.post("/product", mid.authentication, productController.addProduct);

router.get("/product", mid.authentication,  productController.getAllProducts);

router.put("/product/:productId", mid.authentication, mid.authorization, productController.updateProduct);

router.delete("/product/:productId", mid.authentication, mid.authorization, productController.deleteProduct);

module.exports = router;
