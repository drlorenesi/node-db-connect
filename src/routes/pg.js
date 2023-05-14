const express = require('express');
const { queryPGSQL } = require('../config/db/postgres');

const router = express.Router();

// http://localhost:9001/postgres
router.get('/', async (req, res) => {
  const { rows, duration } = await queryPGSQL('SELECT NOW()');
  res.send({ message: '200 OK', duration, rows });
});

module.exports = router;
