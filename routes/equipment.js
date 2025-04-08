var express = require('express');
var router = express.Router();

// Mock data for demonstration purposes
let equipment = [
  { id: 1, name: 'Treadmill', type: 'Cardio' },
  { id: 2, name: 'Dumbbell', type: 'Strength' }
];

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