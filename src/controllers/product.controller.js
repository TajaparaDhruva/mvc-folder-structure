// src/controllers/product.controller.js

const Product = require('../models/product.model');

// Create a product
const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    const newProduct = new Product({ name, price, category, stock });
    await newProduct.save();

    res.status(201).json({
      msg:      'Product created successfully.',
      product:  newProduct,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      msg:    'Products fetched successfully.',
      count:  products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    res.status(200).json({
      msg:      'Product updated successfully.',
      product:  updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    res.status(200).json({ msg: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};