var express = require("express");
const { query } = require("../modules/db");
var router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    // 1. Sütik lekérdezése
    const sutik = await query(`SELECT * FROM suti ORDER BY id`);

    for (let suti of sutik) {
      // Tartalmak
      suti.tartalmak = await query(
        `SELECT * FROM tartalom WHERE sutiid = '${suti.id}'`
      );

      // Árak
      suti.arak = await query(
        `SELECT * FROM ar WHERE sutiid = '${suti.id}' ORDER BY ertek`
      );
    }

    const mentesMap = {
      G: "Gluténmentes",
      L: "Laktózmentes",
      HC: "Hozzáadott cukor nélkül",
      Te: "Tejmentes",
      To: "Tojásmentes",
      É: "Édesítőszerrel készült",
    };

    res.render("database", {
      title: "Süti adatbázis",
      sutik: sutik,
      mentesMap: mentesMap,

    });

  } catch (error) {
    console.error("Hiba a sütik lekérdezésekor:", error);
    req.flash("error", "Hiba történt a sütik lekérdezésekor!");
    res.redirect("/");
  }
});

module.exports = router;
