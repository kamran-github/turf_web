const User = require('../models/customApiModel');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, mobile } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName || !mobile) {
      return res.status(400).json({
        success: false,
        message: 'Email, firstName, lastName and mobile are required',
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Check if mobile already exists
    const existingMobile = await User.findOne({
      mobile,
    });

    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message: 'Mobile number already registered',
      });
    }

    // Create user
    const user = await User.create({
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobile: mobile.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error('Create user error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Get users error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


// Get single user
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get user error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, mobile } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check email uniqueness
    if (email && email.toLowerCase() !== user.email) {
      const emailExists = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });

      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered',
        });
      }

      user.email = email.toLowerCase().trim();
    }

    // Check mobile uniqueness
    if (mobile && mobile !== user.mobile) {
      const mobileExists = await User.findOne({
        mobile,
        _id: { $ne: id },
      });

      if (mobileExists) {
        return res.status(409).json({
          success: false,
          message: 'Mobile number already registered',
        });
      }

      user.mobile = mobile.trim();
    }

    if (firstName) {
      user.firstName = firstName.trim();
    }

    if (lastName) {
      user.lastName = lastName.trim();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update user error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
