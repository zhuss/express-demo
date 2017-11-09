var express = require('express');
var router = express.Router();

var user = require('../models/user');

//注册接口
router.post("/register",(req,res,next)=>{
    if(req.body.account == ""||req.body.password == ""||req.body.name==""){
        res.json({
            code:201,
            message:'表单必填'
        });
    }else{
        user.register(req,res,next);
    }
});

//登录接口
router.post("/login", (req,res,next) => {
   user.login(req,res,next);
});

//列表接口
router.post("/list", (req,res,next) => {
    user.list(req,res,next);
 });

module.exports = router;
