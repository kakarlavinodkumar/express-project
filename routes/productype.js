var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let productTypes = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Furniture' }
];
/**
 * @swagger
 * tags:
 *   name: ProductTypes
 *   description: API for managing product types
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new product type
 *     tags: [ProductTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product type
 *                 example: Clothing
 *     responses:
 *       201:
 *         description: The product type was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the product type
 *                 name:
 *                   type: string
 *                   description: The name of the product type
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all product types
 *     tags: [ProductTypes]
 *     responses:
 *       200:
 *         description: A list of product types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the product type
 *                   name:
 *                     type: string
 *                     description: The name of the product type
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a product type by ID
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product type
 *     responses:
 *       200:
 *         description: The product type details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the product type
 *                 name:
 *                   type: string
 *                   description: The name of the product type
 *       404:
 *         description: Product type not found
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a product type by ID
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the product type
 *                 example: Updated Name
 *     responses:
 *       200:
 *         description: The updated product type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the product type
 *                 name:
 *                   type: string
 *                   description: The name of the product type
 *       404:
 *         description: Product type not found
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a product type by ID
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product type
 *     responses:
 *       200:
 *         description: The deleted product type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the product type
 *                 name:
 *                   type: string
 *                   description: The name of the product type
 *       404:
 *         description: Product type not found
 */
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