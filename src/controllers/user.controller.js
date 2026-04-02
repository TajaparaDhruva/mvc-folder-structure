// src/controllers/user.controller.js

const User = require('../models/user.model');

// ─────────────────────────────────────────────
// CREATE — POST /api/users
// ─────────────────────────────────────────────
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = new User({ name, email, age });
    await newUser.save();

    res.status(201).json({
      msg:  'User created successfully.',
      user: newUser,
    });

  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

// ─────────────────────────────────────────────
// READ ALL — GET /api/users
// ─────────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      msg:   'Users fetched successfully.',
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

// ─────────────────────────────────────────────
// READ ONE — GET /api/users/:id
// ─────────────────────────────────────────────
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    res.status(200).json({
      msg:  'User fetched successfully.',
      user,
    });

  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};