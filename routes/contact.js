const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("contact", {
    title: "Kapcsolatfelvétel",
  });
});

router.post("/", function (req, res, next) {
  const { name, email, message } = req.body;
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "A név legalább 2 karakter kell legyen!";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Érvényes e-mail címet adj meg!";
  }

  if (!message || message.trim().length < 10) {
    errors.message = "Az üzenet legalább 10 karakter kell legyen!";
  }

  if (Object.keys(errors).length > 0) {
    return res.render("contact", {
      title: "Kapcsolatfelvétel",
      errors: errors,
      formData: { name, email, message },
    });
  }

  console.log("Új üzenet:", { name, email, message });

  req.flash("success", "Köszönjük az üzeneted! Hamarosan válaszolunk.");
  res.redirect("/contact");
});

module.exports = router;
