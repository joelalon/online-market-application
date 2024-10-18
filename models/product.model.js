const mongoose = require('mongoose');

const Category = require('./categories.model');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: {
        type: String,
        validate: {
            validator: function (value) {
                // Return a Promise that resolves if the category exists, or rejects if it doesn't
                return Category.findOne({ name: value }).then(category => {
                    return !!category; // Return true if category exists, otherwise false
                }).catch(() => {
                    return false; // In case of error, validation fails
                });
            },
            message: 'Category not found in the categories table.'
        }
    }
});

const product = mongoose.model('product', productSchema);
module.exports = product;
