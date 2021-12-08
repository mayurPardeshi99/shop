import Product from "../models/productSchema.js";
import asyncHandler from "express-async-handler";

// @desc      Fetch all products
// @routes    GET /api/products
// @access    Public
export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
});

// @desc      Fetch Top Rated Products
// @routes    GET /api/products/top
// @access    Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(3);
  res.json(products);
});

// @desc      Fetch single products
// @routes    GET /api/products/:id
// @access    Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// @desc      Delete a product
// @routes    GET /api/products/:id
// @access    Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Deleted successfully." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// @desc      Create a product
// @routes    POST /api/products
// @access    Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample product",
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "My brand",
    category: "Electronics",
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.json(createdProduct);
});

// @desc      Update a product
// @routes    PUT /api/products/:id
// @access    Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});

// @desc      Create a review
// @routes    POST /api/products/:id/review
// @access    Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "Review Added" });
    }
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});
