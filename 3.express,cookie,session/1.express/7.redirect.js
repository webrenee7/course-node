var express=require('express');
var app=express();
//如果客户端访问的时候，路径有查询参数username=admin,继续访问。如果没有username，或者值不是admin参数的话，跳转到noauth页面
app.use(function (req,res,next) {
    if(req.path=='/noauth'){//如果访问这个路径，直接运行next()，不进入下面的判断
        next();
    }else{
        if(req.query.username=='admin'){
            next();
        }else{
            //告诉客户端向另外一个路径发送请求
            res.redirect('/noauth');
        }
    }
});
app.get('/user',function (req,res) {
    res.end('user');
});
app.get('/noauth',function (req,res) {
    res.end('noauth');
});
app.listen(8080);