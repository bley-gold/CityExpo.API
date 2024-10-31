const CustomerService = require('../service/customerService'); // Adjust the path as necessary

// Controller for creating a customer
const createCustomer = (req, res) => {
    CustomerService.createCustomer(req.body, (err, result) => {
        if (err) {
            return res.status(err.status || 500).json(err);
        }
        res.status(200).json(result);
    });
};

// Controller for verifying the OTP
const verifyOtp = (req, res) => {
    const { otp } = req.body;
    CustomerService.verifyOtp(otp, (err, result) => {
        if (err) {
            return res.status(err.status || 500).json(err);
        }
        res.status(200).json(result);
    });
};

// Controller for logging in a customer
const loginCustomer = (req, res) => {
    const { email, password } = req.body;
    CustomerService.loginCustomer(email, password, (err, result) => {
        if (err) {
            return res.status(err.status || 500).json(err);
        }
        res.status(200).json(result);
    });
};

module.exports = {
    createCustomer,
    verifyOtp,
    loginCustomer // Export the new loginCustomer function
};
