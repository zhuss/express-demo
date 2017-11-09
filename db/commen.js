var mysql = require('mysql');
var $conf = require('../db/config');
var pool = mysql.createPool($conf.mysql);
module.exports = {
    query:function(res,callback){
        pool.getConnection((err,connection)=>{
            if(err){
                 //链接失败
                console.log("建立连接失败");
                res.json({
                code:100,
                message:'系统错误'
                });
            }else{
                callback(connection);
            }
        })
    }
}