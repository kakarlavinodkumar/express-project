var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let gyms = [
  { id: 1, name: 'Gold\'s Gym', location: 'Los Angeles' },
  { id: 2, name: 'Planet Fitness', location: 'New York' }
];

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