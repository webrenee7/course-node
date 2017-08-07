var express=require('express');
var app=express();
var cookieParser=require('cookie-parser');
app.use(cookieParser());
app.get('/write',function (req,res) {
    //a.zfpx.cn
    // res.cookie('name','zfpx',{domain:'a.zfpx.cn'});//如果是这个域名就带上cookie，不是这个域名就不带
    // res.cookie('name','zfpx',{path:'/read'});//path==>路径
    // res.cookie('name','zfpx',{expires:new Date(Date.now()+10*1000)});//expires==>过期时间
    // res.cookie('name','zfpx',{maxAge:10*1000});//maxAge==>有效时间
    res.cookie('name','zfpx',{httpOnly:true});//httpOnly==>不能通过浏览器js访问已经设置的cookie,但是可以新增  document.cookie==>''
    res.end('写入成功！');
});
app.get('/read',function (req,res) {
    res.send(req.cookies)
});
app.listen(8080);