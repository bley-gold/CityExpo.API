const db = require('../config/config');

const CustomerDAO = {
    create: (customerData, callback) => {
        const sql = 'INSERT INTO customer SET ?'; // Ensure the table name is correct (use 'customers' if that's your actual table)
        db.query(sql, customerData, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return callback({ status: 400, message: 'Duplicate entry' });
                return callback({ status: 500, message: 'Database error'  + err.message });
            }
            callback(null, result);
        });
    },

    getById: (customer_id, callback) => {
        const sql = `SELECT customer_id, firstname, lastname, email, phone_number FROM customers WHERE customer_id = ?`;
        db.query(sql, [customer_id], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0] || null);
        });
    },

    getByEmail: (email, callback) => {
        const sql = `SELECT * FROM customer WHERE email = ?`; // Retrieves all fields for the customer with the specified email
        db.query(sql, [email], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0] || null); // Return the first matching customer or null
        });
    },

    updateFields: (customer_id, updateData, callback) => {
        const sql = 'UPDATE customers SET ? WHERE customer_id = ?';
        db.query(sql, [updateData, customer_id], callback);
    },

    delete: (customer_id, callback) => {
        const sql = 'DELETE FROM customers WHERE customer_id = ?';
        db.query(sql, [customer_id], callback);
    }
};

module.exports = CustomerDAO;
