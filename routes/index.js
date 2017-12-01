var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res,next){
   var script = `<script> 
                  var user = {name:"zhuss",age:23}
                </script>`;
   res.render('index', {script:script});
});


router.post('/', function(req, res, next) {
  res.json({
    code:200,
    message:'请求成功',
    data:{}
  });
});

module.exports = router;
