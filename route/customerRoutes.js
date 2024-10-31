const express = require('express');
const { createCustomer, getCustomer, verifyOtp, updateCustomerStep } = require('../controllers/customerController');

const router = express.Router();

router.post('/customers', createCustomer); 
router.patch('/customers/:customer_id', updateCustomerStep);
router.get('/customers/:customer_id', getCustomer);
router.post('/customers/verify-otp', verifyOtp);

module.exports = router;
