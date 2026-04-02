// src/app.js

const express    = require('express');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 404 — no route matched
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found.' });
});

module.exports = app;