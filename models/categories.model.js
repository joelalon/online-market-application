const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: String
});

const categories = mongoose.model('categories', categoriesSchema);
module.exports = categories;
