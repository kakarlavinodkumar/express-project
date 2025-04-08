var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Smartphone', price: 800 }
];

// CREATE: Add a new product
router.post('/', function(req, res) {
  const newProduct = {
    id: products.length + 1, // Simple ID generation
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// READ: Get all products
router.get('/', function(req, res) {
  res.json(products);
});

// READ: Get a single product by ID
router.get('/:id', function(req, res) {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// UPDATE: Update a product by ID
router.put('/:id', function(req, res) {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  res.json(product);
});

// DELETE: Remove a product by ID
router.delete('/:id', function(req, res) {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct);
});

module.exports = router;