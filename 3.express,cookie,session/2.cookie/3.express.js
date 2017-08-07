var express=require('express');
var app=express();
var cookieParser=require('cookie-parser');
app.use(cookieParser());
app.get('/write',function (req,res) {
    res.cookie('name','zfpx');//cookie方法可以用来写入cookie  两个参数key  value
    res.send('写入成功！');
});
app.get('/read',function (req,res) {
    //req.headers.cookie    querystring  cookieObj
    res.send(req.cookies);//{"name":"zfpx"}
});
app.listen(8080);