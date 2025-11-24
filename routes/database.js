var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Ez lesz itt az adatbázis menüpont.');
});

module.exports = router;
