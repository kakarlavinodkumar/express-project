var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let equipment = [
  { id: 1, name: 'Treadmill', type: 'Cardio' },
  { id: 2, name: 'Dumbbell', type: 'Strength' }
];
/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the equipment
 *         name:
 *           type: string
 *           description: The name of the equipment
 *         type:
 *           type: string
 *           description: The type of the equipment (e.g., Cardio, Strength)
 *       example:
 *         id: 1
 *         name: Treadmill
 *         type: Cardio
 */

/**
 * @swagger
 * tags:
 *   name: Equipment
 *   description: API for managing gym equipment
 */

/**
 * @swagger
 * /equipment:
 *   get:
 *     summary: Get all equipment
 *     tags: [Equipment]
 *     responses:
 *       200:
 *         description: List of all equipment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 */

/**
 * @swagger
 * /equipment/{id}:
 *   get:
 *     summary: Get equipment by ID
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The equipment ID
 *     responses:
 *       200:
 *         description: Equipment data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 */

/**
 * @swagger
 * /equipment:
 *   post:
 *     summary: Add new equipment
 *     tags: [Equipment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       201:
 *         description: Equipment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 */

/**
 * @swagger
 * /equipment/{id}:
 *   put:
 *     summary: Update equipment by ID
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The equipment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Equipment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 */

/**
 * @swagger
 * /equipment/{id}:
 *   delete:
 *     summary: Delete equipment by ID
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The equipment ID
 *     responses:
 *       200:
 *         description: Equipment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 */
// CREATE: Add new equipment
router.post('/', function(req, res) {
  const newEquipment = {
    id: equipment.length + 1, // Simple ID generation
    name: req.body.name,
    type: req.body.type
  };
  equipment.push(newEquipment);
  res.status(201).json(newEquipment);
});

// READ: Get all equipment
router.get('/', function(req, res) {
  res.json(equipment);
});

// READ: Get a single equipment by ID
router.get('/:id', function(req, res) {
  const item = equipment.find(e => e.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Equipment not found' });
  }
  res.json(item);
});

// UPDATE: Update equipment by ID
router.put('/:id', function(req, res) {
  const item = equipment.find(e => e.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Equipment not found' });
  }
  item.name = req.body.name || item.name;
  item.type = req.body.type || item.type;
  res.json(item);
});

// DELETE: Remove equipment by ID
router.delete('/:id', function(req, res) {
  const index = equipment.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Equipment not found' });
  }
  const deletedItem = equipment.splice(index, 1);
  res.json(deletedItem);
});

module.exports = router;