// src/routes/user.routes.js

const express = require('express');
const router  = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
} = require('../controllers/user.controller');

// CRUD routes
router.post('/',    createUser);
router.get('/',     getAllUsers);
router.get('/:id',  getUserById);


module.exports = router;