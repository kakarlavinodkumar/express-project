var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let subscriptions = [
  { id: 1, name: 'Basic Plan', price: 20 },
  { id: 2, name: 'Premium Plan', price: 50 }
];

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