var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json({
    code:200,
    message:'请求成功',
    data:{}
  });
});

module.exports = router;
