const Product = require('../models/product.model');

// Create and Save a new product
exports.create = (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    });

    product.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Retrieve all products
exports.findAll = (req, res) => {
    const name = req.query.name;

    let filter = {};
    if (name) {
        filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    Product.find(filter).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Find a single product by id
exports.findOne = (req, res) => {
    Product.findById(req.params.id).then(data => {
        if (!data) res.status(404).send({ message: "Product not found" });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Update a product by id
exports.update = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) res.status(404).send({ message: "Product not found" });
        else res.send({ message: "Product updated successfully.", product: data });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Delete a product by id
exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(data => {
        if (!data) res.status(404).send({ message: "Product not found" });
        else res.send({ message: "Product deleted successfully." });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Delete all products
exports.deleteAll = (req, res) => {
    Product.deleteMany().then(data => {
        res.send({ message: `${data.deletedCount} products were deleted successfully.` });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
