const CustomerDAO = require('../DAO/customerDAO');
const EmailService = require('./emailService');
const crypto = require('crypto');

const otpMap = new Map();
const tempCustomerData = new Map();

const CustomerService = {
    createCustomer: (customerData, callback) => {
        if (!customerData) {
            console.error('Customer data is required'); // Log error
            return callback({ status: 400, message: 'Customer data is required' });
        }

        try {
            // Validate customer data with the Customer model
            const customer = {
                FirstName: customerData.FirstName,
                LastName: customerData.LastName,
                PhoneNumber: customerData.PhoneNumber,
                Address: customerData.Address,
                Email: customerData.Email,
                Password: customerData.Password // Storing password as is
            };

            // Store customer data temporarily
            tempCustomerData.set(customerData.Email, customerData); // Use email as key
            console.log(`Customer data stored for email: ${customerData.Email}`); // Log success
            
            // Generate OTP
            const otp = crypto.randomInt(100000, 999999).toString();
            otpMap.set(customerData.Email, otp);
            console.log(`Generated OTP for ${customerData.Email}: ${otp}`); // Log OTP generation
            
            // Send OTP email
            EmailService.sendOtpEmail(customerData.Email, otp)
                .then(() => {
                    console.log(`OTP sent to ${customerData.Email}`); // Log success
                    callback(null, { message: 'Customer data stored. OTP sent. Verify it.' });
                })
                .catch(emailErr => {
                    console.error('Failed to send OTP:', emailErr); // Log email error
                    callback({ status: 500, message: 'Failed to send OTP: ' + emailErr.message });
                });
        } catch (validationError) {
            console.error('Validation error:', validationError.message); // Log validation error
            callback({ status: 400, message: validationError.message });
        }
    },

    verifyOtp: (otp, callback) => {
        console.log(`Verifying OTP: ${otp}`); // Log OTP verification attempt
        const email = Array.from(tempCustomerData.keys()).find(email => otpMap.has(email)); // Get email associated with the OTP
        const storedOtp = otpMap.get(email);

        if (storedOtp !== otp) {
            console.error('Invalid OTP for email:', email); // Log invalid OTP attempt
            return callback({ status: 400, message: 'Invalid OTP' });
        }

        const customerData = tempCustomerData.get(email);
        if (!customerData) {
            console.error('Customer data not found for email:', email); // Log error
            return callback({ status: 404, message: 'Customer data not found for email.' });
        }

        CustomerDAO.create(customerData, (err) => {
            if (err) {
                console.error('Database error:', err); // Log database error
                return callback({ status: 500, message: 'Database error' });
            }

            console.log(`OTP verified, customer created for email: ${email}`); // Log success
            otpMap.delete(email);
            tempCustomerData.delete(email);
            callback(null, { message: 'OTP verified, customer created.' });
        });
    },

    loginCustomer: (email, password, callback) => {
        console.log(`Attempting to log in with email: ${email}`); // Log login attempt
        CustomerDAO.getByEmail(email, (err, customer) => {
            if (err) {
                console.error('Database error during login:', err); // Log error
                return callback({ status: 500, message: 'Database error' });
            }
            if (!customer) {
                console.error('No customer found with the email:', email); // Log error
                return callback({ status: 401, message: 'Invalid email or password' }); // Email not found
            }

            // Directly compare the provided password with the stored password
            if (customer.Password !== password) {
                console.error('Password mismatch for email:', email); // Log error
                return callback({ status: 401, message: 'Invalid email or password' }); // Password mismatch
            }

            // Successful login
            console.log(`Login successful for email: ${email}`); // Log success
            callback(null, { message: 'Login successful', customer });
        });
    }
};

module.exports = CustomerService;
