var express = require("express");
var router = express.Router();
const { query } = require("../modules/db");
const { checkAdmin } = require("../modules/auth");

router.get("/", checkAdmin, async function (req, res, next) {
  try {
    const users = await query("SELECT * FROM users");
    res.render("admin", { title: "Admin oldal", user: req.user, users: users });
  } catch (error) {
    req.flash("error", "Hiba történt a felhasználók lekérése során!");
    res.redirect("/");
  }
});

module.exports = router;
