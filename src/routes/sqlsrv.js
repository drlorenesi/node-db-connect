const express = require('express');
const Joi = require('joi');
const { validateQuery } = require('../middleware/validate');
const { query } = require('../config/db/sqlsrv');

const router = express.Router();

const validateDates = (data) => {
  const schema = Joi.object({
    fechaIni: Joi.date().iso().greater('2000-01-01').required(),
    fechaFin: Joi.date().iso().max('2040-01-01').required(),
  });
  return schema.validate(data);
};

// http://localhost:9001/sqlsrv?fechaIni=2021-12-01&fechaFin=2021-12-01
router.get('/', [validateQuery(validateDates)], async (req, res) => {
  const { fechaIni, fechaFin } = req.query;
  const { duration, rowsAffected, rows } = await query(`
  DECLARE @fecha_ini DATETIME = '${fechaIni}'
  DECLARE @fecha_fin DATETIME = '${fechaFin}'
  SELECTS
    DATEDIFF(year, @fecha_ini, @fecha_fin) diff_en_años,
    DATEDIFF(quarter, @fecha_ini, @fecha_fin) diff_en_trimestres,
    DATEDIFF(month, @fecha_ini, @fecha_fin) diff_en_meses,
    DATEDIFF(dayofyear, @fecha_ini, @fecha_fin) diff_en_dayofyear,
    DATEDIFF(day, @fecha_ini, @fecha_fin) diff_en_dias,
    DATEDIFF(week, @fecha_ini, @fecha_fin) diff_en_semanas;
  `);
  res.send({ duration, rowsAffected, rows });
});

module.exports = router;
