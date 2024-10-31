const bcrypt = require('bcryptjs');
const CustomerDAO = require('../DAO/customerDAO');
const EmailService = require('./emailService');
const crypto = require('crypto');

const otpMap = new Map();
const tempCustomerData = new Map();
const SALT_ROUNDS = 10;

const CustomerService = {
    createCustomer: (customerData, callback) => {
        if (!customerData) {
            return callback({ status: 400, message: 'Customer data is required' });
        }

        bcrypt.hash(customerData.password, SALT_ROUNDS, (err, hashedPassword) => {
            if (err) {
                return callback({ status: 500, message: 'Error hashing password' });
            }
            customerData.password = hashedPassword;
            tempCustomerData.set(customerData.customer_id, customerData);
            callback(null, { message: 'Customer data stored. Proceed to the next step.' });
        });
    },

    updateCustomerStep: (customer_id, stepData, callback) => {
        const existingData = tempCustomerData.get(customer_id);
        if (!existingData) return callback({ status: 404, message: 'Customer ID not found' });

        const updatedData = { ...existingData, ...stepData };
        tempCustomerData.set(customer_id, updatedData);

        if (stepData.Email) {
            const otp = crypto.randomInt(100000, 999999).toString();
            otpMap.set(stepData.Email, otp);
            EmailService.sendOtpEmail(stepData.Email, otp)
                .then(() => callback(null, { message: 'OTP sent. Verify it.' }))
                .catch(emailErr => callback({ status: 500, message: 'Failed to send OTP: ' + emailErr.message }));
        } else {
            callback(null, { message: 'Customer data updated successfully.' });
        }
    },

    verifyOtp: (Email, otp, callback) => {
        const storedOtp = otpMap.get(Email);
        if (storedOtp !== otp) return callback({ status: 400, message: 'Invalid OTP' });

        const customerData = Array.from(tempCustomerData.values()).find(data => data.Email === Email);
        if (!customerData) return callback({ status: 404, message: 'Customer data not found for email.' });

        CustomerDAO.create(customerData, (err) => {
            if (err) return callback({ status: 500, message: 'Database error' });

            otpMap.delete(Email);
            tempCustomerData.delete(customerData.customer_id);
            callback(null, { message: 'OTP verified, customer created.' });
        });
    }
};

module.exports = CustomerService;
