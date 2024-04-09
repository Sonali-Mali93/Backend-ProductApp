const productModel = require("../model/product");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  try {
    let { name, description, price } = req.body;
    let userId = req.userId;
    let productDetails = await productModel.create({
      name,
      description,
      price,
      user: userId,
    });
    return res.status(201).send({
      status: true,
      message: "Product added successfully",
      data: productDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "failure",
      error,
    });
  }
};

// function to fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({ user: req.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  fetch a specific product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// function to update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// function to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productIdObj = new mongoose.Types.ObjectId(req.params.productId);
    const product = await productModel.findByIdAndDelete(productIdObj);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
