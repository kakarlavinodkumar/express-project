var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let productTypes = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Furniture' }
];

// CREATE: Add a new product type
router.post('/', function(req, res) {
  const newProductType = {
    id: productTypes.length + 1, // Simple ID generation
    name: req.body.name
  };
  productTypes.push(newProductType);
  res.status(201).json(newProductType);
});

// READ: Get all product types
router.get('/', function(req, res) {
  res.json(productTypes);
});

// READ: Get a single product type by ID
router.get('/:id', function(req, res) {
  const productType = productTypes.find(pt => pt.id === parseInt(req.params.id));
  if (!productType) {
    return res.status(404).json({ message: 'Product type not found' });
  }
  res.json(productType);
});

// UPDATE: Update a product type by ID
router.put('/:id', function(req, res) {
  const productType = productTypes.find(pt => pt.id === parseInt(req.params.id));
  if (!productType) {
    return res.status(404).json({ message: 'Product type not found' });
  }
  productType.name = req.body.name || productType.name;
  res.json(productType);
});

// DELETE: Remove a product type by ID
router.delete('/:id', function(req, res) {
  const productTypeIndex = productTypes.findIndex(pt => pt.id === parseInt(req.params.id));
  if (productTypeIndex === -1) {
    return res.status(404).json({ message: 'Product type not found' });
  }
  const deletedProductType = productTypes.splice(productTypeIndex, 1);
  res.json(deletedProductType);
});

module.exports = router;