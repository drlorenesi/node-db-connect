const express = require("express");
const Joi = require("joi");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middleware/validate");
const { query, execute } = require("../config/db/mysql");
const getPagination = require("../utils/pagination");

const router = express.Router();

const validateId = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer(),
  });
  return schema.validate(data);
};

const validatePagination = (data) => {
  const schema = Joi.object({
    _limit: Joi.number().integer(),
    _page: Joi.number().integer(),
  });
  return schema.validate(data);
};

const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    body: Joi.string().min(2).required(),
    userId: Joi.number().integer(),
  });
  return schema.validate(data);
};

// http://localhost:9001/mysql?_page=1
// router.get('/', [validateQuery(validatePagination)], async (req, res) => {
//   const { _page, _limit } = req.query;
//   const { rows: count } = await query(
//     `SELECT count(*) AS count FROM posts`
//   );
//   if (_page) {
//     console.log(getPagination(_page, _limit), count[0].count);
//     const { rows } = await query(
//       `SELECT * FROM posts ${getPagination(_page, _limit)}`
//     );
//     res.send({ results: rows.length, rows });
//   } else {
//     const { rows } = await query(`SELECT * FROM posts`);
//     res.send({ results: rows.length, rows });
//   }
// });
router.get("/", [validateQuery(validatePagination)], async (req, res) => {
  const { _limit, _page } = req.query;
  const { rows } = await query(`SELECT * FROM posts;`);
  res.send({ _limit, _page, rows });
});

// http://localhost:9001/mysql/1
router.get("/:id", [validateParams(validateId)], async (req, res) => {
  const { id } = req.params;
  const { rows } = await execute(`SELECT * FROM posts WHERE id = ?;`, [id]);
  if (rows.length === 0)
    return res.status(404).send({ message: "Resource not found." });
  res.send(rows[0]);
});

// http://localhost:9001/mysql/1
router.put(
  "/:id",
  [validateParams(validateId), validateBody(validatePost)],
  async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const { rows } = await execute(
      `UPDATE posts SET title = ?, body = ? WHERE id = ?`,
      [title, body, id]
    );
    if (rows.affectedRows === 0)
      return res.status(404).send({ message: "Resource not found." });
    res.send({ rows });
  }
);

// http://localhost:9001/mysql/
router.post("/", [validateBody(validatePost)], async (req, res) => {
  const { title, body, userId } = req.body;
  const { rows } = await execute(
    `INSERT INTO posts (title, body, user_id) VALUES (?, ?, ?)`,
    [title, body, userId]
  );
  if (rows.affectedRows === 0)
    return res.status(400).send({ message: "Could not create resource." });
  res.send({ rows });
});

// http://localhost:9001/mysql/1
router.delete("/:id", [validateParams(validateId)], async (req, res) => {
  const { id } = req.params;
  const { rows } = await execute(`DELETE FROM posts WHERE id = ?`, [id]);
  if (rows.affectedRows === 0)
    return res.status(404).send({ message: "Resource not found." });
  res.send({ rows });
});

module.exports = router;
