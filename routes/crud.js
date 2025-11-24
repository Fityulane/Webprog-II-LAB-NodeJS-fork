var express = require("express");
var router = express.Router();
const { query } = require("../modules/db");

router.get("/", async function (req, res, next) {
  const page = parseInt(req.query.oldal) || 1;
  const limit = 15;
  const offset = (page - 1) * limit;

  const totalResult = await query(`SELECT COUNT(*) AS count FROM suti`);
  
  const total = totalResult[0].count;
  const totalPages = Math.ceil(total / limit);

  const sutik = await query(
    `SELECT * FROM suti ORDER BY id LIMIT ${limit} OFFSET ${offset}`
  );

  res.render("crud/sutik", {
    title: "CRUD Süti",
    sutik,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1,
      total: total,
    },
  });
});

module.exports = router;
