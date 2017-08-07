var express=require('express');
var session=require('express-session');
var app=express();
app.use(session({
    resave:true,//每次访问服务器，重新保存session
    saveUninitialized:true,//保存未初始化的session
    secret:'zfpx'//用来加密cookie
}));//一般来说，中间件模块导出对象都是一个函数，调用它可以返回一个中间件函数
app.get('/write',function (req,res) {
    req.session.username='zfpx';//赋值
    res.end('write');
});
app.get('/read',function (req,res) {
    res.send(req.session.username);//取值
});
app.listen(8080);