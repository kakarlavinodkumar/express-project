var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let trainers = [
  { id: 1, name: 'John Doe', specialty: 'Strength Training' },
  { id: 2, name: 'Jane Smith', specialty: 'Yoga' }
];

/**
 * @swagger
 * tags:
 *   name: Trainers
 *   description: API for managing trainers
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new trainer
 *     tags: [Trainers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trainer created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all trainers
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: List of trainers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a trainer by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Trainer ID
 *     responses:
 *       200:
 *         description: Trainer details
 *       404:
 *         description: Trainer not found
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a trainer by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Trainer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trainer updated successfully
 *       404:
 *         description: Trainer not found
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove a trainer by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Trainer ID
 *     responses:
 *       200:
 *         description: Trainer deleted successfully
 *       404:
 *         description: Trainer not found
 */

// CREATE: Add a new trainer
router.post('/', function(req, res) {
  const newTrainer = {
    id: trainers.length + 1, // Simple ID generation
    name: req.body.name,
    specialty: req.body.specialty
  };
  trainers.push(newTrainer);
  res.status(201).json(newTrainer);
});

// READ: Get all trainers
router.get('/', function(req, res) {
  res.json(trainers);
});

// READ: Get a single trainer by ID
router.get('/:id', function(req, res) {
  const trainer = trainers.find(t => t.id === parseInt(req.params.id));
  if (!trainer) {
    return res.status(404).json({ message: 'Trainer not found' });
  }
  res.json(trainer);
});

// UPDATE: Update a trainer by ID
router.put('/:id', function(req, res) {
  const trainer = trainers.find(t => t.id === parseInt(req.params.id));
  if (!trainer) {
    return res.status(404).json({ message: 'Trainer not found' });
  }
  trainer.name = req.body.name || trainer.name;
  trainer.specialty = req.body.specialty || trainer.specialty;
  res.json(trainer);
});

// DELETE: Remove a trainer by ID
router.delete('/:id', function(req, res) {
  const trainerIndex = trainers.findIndex(t => t.id === parseInt(req.params.id));
  if (trainerIndex === -1) {
    return res.status(404).json({ message: 'Trainer not found' });
  }
  const deletedTrainer = trainers.splice(trainerIndex, 1);
  res.json(deletedTrainer);
});

module.exports = router;