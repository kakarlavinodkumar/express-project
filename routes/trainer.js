var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let trainers = [
  { id: 1, name: 'John Doe', specialty: 'Strength Training' },
  { id: 2, name: 'Jane Smith', specialty: 'Yoga' }
];

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