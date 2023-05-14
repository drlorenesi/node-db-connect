const express = require('express');
const { query, sql } = require('../config/db/postgres');

const router = express.Router();

// http://localhost:9001/postgres
router.get('/', async (req, res) => {
  const { result, duration } = await query(sql`SELECT NOW()`);
  res.send({ message: '200 OK', duration, result });
});

module.exports = router;
