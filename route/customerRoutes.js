// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

// Route for creating a customer
router.post('/customers', CustomerController.createCustomer);

// Route for verifying the OTP
router.post('/customers/verify-otp', CustomerController.verifyOtp);

// Route for logging in a customer
router.post('/customers/login', CustomerController.loginCustomer); // Add the login route

module.exports = router;
