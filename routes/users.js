var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// CREATE: Add a new user
router.post('/', function(req, res) {
  const newUser = {
    id: users.length + 1, // Simple ID generation
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ: Get all users
router.get('/', function(req, res) {
  res.json(users);
});

// READ: Get a single user by ID
router.get('/:id', function(req, res) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// UPDATE: Update a user by ID
router.put('/:id', function(req, res) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

// DELETE: Remove a user by ID
router.delete('/:id', function(req, res) {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

module.exports = router;
