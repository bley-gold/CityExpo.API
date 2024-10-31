const CustomerService = require('../service/customerService');
const bcrypt = require('bcryptjs');

const createCustomer = (req, res) => {
    const customerData = req.body;
    CustomerService.createCustomer(customerData, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.status(201).send(result);
    });
};

const getCustomerById = (req, res) => {
    const customer_id = req.params.customer_id;
    const password = req.body.password;

    CustomerService.getCustomerById(customer_id, (err, customer) => {
        if (err) return res.status(500).send({ error: err.message });
        if (customer) {
            bcrypt.compare(password, customer.password, (err, result) => {
                if (err) return res.status(500).send({ error: 'Password comparison error' });
                res.status(result ? 200 : 401).send(result ? customer : { error: 'Authentication failed' });
            });
        } else {
            res.status(404).send({ error: 'Customer not found' });
        }
    });
};

module.exports = { createCustomer, getCustomerById };
