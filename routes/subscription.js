var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let subscriptions = [
  { id: 1, name: 'Basic Plan', price: 20 },
  { id: 2, name: 'Premium Plan', price: 50 }
];
/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The subscription ID
 *         name:
 *           type: string
 *           description: The name of the subscription plan
 *         price:
 *           type: number
 *           description: The price of the subscription plan
 *       required:
 *         - name
 *         - price
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: The subscription was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: A list of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: The subscription details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: The updated subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: The deleted subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 */
// CREATE: Add a new subscription
router.post('/', function(req, res) {
  const newSubscription = {
    id: subscriptions.length + 1, // Simple ID generation
    name: req.body.name,
    price: req.body.price
  };
  subscriptions.push(newSubscription);
  res.status(201).json(newSubscription);
});

// READ: Get all subscriptions
router.get('/', function(req, res) {
  res.json(subscriptions);
});

// READ: Get a single subscription by ID
router.get('/:id', function(req, res) {
  const subscription = subscriptions.find(s => s.id === parseInt(req.params.id));
  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }
  res.json(subscription);
});

// UPDATE: Update a subscription by ID
router.put('/:id', function(req, res) {
  const subscription = subscriptions.find(s => s.id === parseInt(req.params.id));
  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }
  subscription.name = req.body.name || subscription.name;
  subscription.price = req.body.price || subscription.price;
  res.json(subscription);
});

// DELETE: Remove a subscription by ID
router.delete('/:id', function(req, res) {
  const index = subscriptions.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Subscription not found' });
  }
  const deletedSubscription = subscriptions.splice(index, 1);
  res.json(deletedSubscription);
});

module.exports = router;