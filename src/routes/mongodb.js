const express = require('express');

const router = express.Router();

// http://localhost:9001/mongodb
router.get('/', async (req, res) => {
  res.send({ message: '200 OK' });
});

module.exports = router;
