var commen = require('../db/commen');

module.exports = {
    //登录
    login:function(req,res,next){
        //前端传输的值
        var user = req.body;
        commen.query(res,(connection)=>{
            var sql = "select name,account,id from user where account = ? and password = ? ";
            connection.query(sql,[user.account,user.password],(err,rows)=>{
                //关闭连接
                connection.release();

                if(err){
                  res.json({
                    code:100,
                    message:'系统错误'
                  });
                }else{
                  if(rows.length > 0){
                    res.json({
                      code:200,
                      message:'success',
                      data:rows[0]
                    });
                  }else{
                    res.json({
                      code:201,
                      message:'用户名或密码错误'
                    });
                  }
                }
            });
        });
    },

    //list
    list:function(req,res,next){
    var pageId = req.body.pageId||0;
    var size = 10;
    var start = pageId * size;
    commen.query(res,(connection)=>{
            var  sql = "select count(*) from user ; select id , name , account from user limit ? , ?";
            connection.query(sql,[start, size],(err,rows) => {
                //关闭连接
                connection.release();
                if(!err){
                    res.json({
                        code:200,
                        message:'success',
                        data:{
                            total:rows[0][0]['count(*)'],
                            list:rows[1]
                        }
                    });
                }else{
                    res.json({
                        code:100,
                        message:'系统错误'
                    });
                }
            });
        });
    },

    //注册
    register:function(req,res,next){
        var user = req.body;
        commen.query(res,(connection)=> {
            var selectSql =  "select * from user where account = ?";
            connection.query(selectSql,[user.account],(err,rows)=> {
                if(!err){
                    if(rows.length == 0){
                        user.createTime = new Date().getTime();
                        var insertSql = "insert into user(account,password,name,createTime) values(?,?,?,?)"
                        connection.query(insertSql,[user.account,user.password,user.name,user.createTime],(err,rows)=>{
                            //关闭连接
                            connection.release();
                            if(err){
                                res.json({
                                    code:100,
                                    message:'系统错误'
                                });
                            }else{
                                console.log(err);
                                res.json({
                                    code:200,
                                    message:'success'
                                });
                            }
                        });
                    }else{
                        res.json({
                            code:201,
                            message:'账号被占用了'
                        });
                    }
                }else{
                    console.log(err);
                    res.json({
                        code:100,
                        message:'系统错误'
                    });
                }
            });
        });
    }
}