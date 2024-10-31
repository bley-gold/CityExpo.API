const db = require('../config/config');

const CustomerDAO = {
    create: (customerData, callback) => {
        const sql = 'INSERT INTO customers SET ?';
        db.query(sql, customerData, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return callback({ status: 400, message: 'Duplicate entry' });
                return callback({ status: 500, message: 'Database error' });
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
