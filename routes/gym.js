var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let gyms = [
  { id: 1, name: 'Gold\'s Gym', location: 'Los Angeles' },
  { id: 2, name: 'Planet Fitness', location: 'New York' }
];
/**
 * @swagger
 * components:
 *   schemas:
 *     Gym:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the gym
 *         name:
 *           type: string
 *           description: The name of the gym
 *         location:
 *           type: string
 *           description: The location of the gym
 *       required:
 *         - name
 *         - location
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new gym
 *     tags: [Gyms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gym'
 *     responses:
 *       201:
 *         description: Gym created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gym'
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all gyms
 *     tags: [Gyms]
 *     responses:
 *       200:
 *         description: List of gyms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gym'
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a gym by ID
 *     tags: [Gyms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the gym
 *     responses:
 *       200:
 *         description: Gym details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gym'
 *       404:
 *         description: Gym not found
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a gym by ID
 *     tags: [Gyms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the gym
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gym'
 *     responses:
 *       200:
 *         description: Gym updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gym'
 *       404:
 *         description: Gym not found
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove a gym by ID
 *     tags: [Gyms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the gym
 *     responses:
 *       200:
 *         description: Gym deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gym'
 *       404:
 *         description: Gym not found
 */
// CREATE: Add a new gym
router.post('/', function(req, res) {
  const newGym = {
    id: gyms.length + 1, // Simple ID generation
    name: req.body.name,
    location: req.body.location
  };
  gyms.push(newGym);
  res.status(201).json(newGym);
});

// READ: Get all gyms
router.get('/', function(req, res) {
  res.json(gyms);
});

// READ: Get a single gym by ID
router.get('/:id', function(req, res) {
  const gym = gyms.find(g => g.id === parseInt(req.params.id));
  if (!gym) {
    return res.status(404).json({ message: 'Gym not found' });
  }
  res.json(gym);
});

// UPDATE: Update a gym by ID
router.put('/:id', function(req, res) {
  const gym = gyms.find(g => g.id === parseInt(req.params.id));
  if (!gym) {
    return res.status(404).json({ message: 'Gym not found' });
  }
  gym.name = req.body.name || gym.name;
  gym.location = req.body.location || gym.location;
  res.json(gym);
});

// DELETE: Remove a gym by ID
router.delete('/:id', function(req, res) {
  const gymIndex = gyms.findIndex(g => g.id === parseInt(req.params.id));
  if (gymIndex === -1) {
    return res.status(404).json({ message: 'Gym not found' });
  }
  const deletedGym = gyms.splice(gymIndex, 1);
  res.json(deletedGym);
});

module.exports = router;