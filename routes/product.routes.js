module.exports = app => {
    const product = require('../controllers/product.controller');

    let router = require('express').Router();

    // Create a new product
    router.post('/', product.create);

    // Retrieve all products
    router.get('/', product.findAll);

    // Retrieve a single product by id
    router.get('/:id', product.findOne);

    // Update a product by id
    router.put('/:id', product.update);

    // Delete a product by id
    router.delete('/:id', product.delete);

    // Delete all products
    router.delete('/', product.deleteAll);

    app.use('/api/products', router);
};
