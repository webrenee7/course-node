var express = require('express');
var app=express();
var cookieParser=require('cookie-parser');
app.use(cookieParser());
app.get('/visit',function(req,res){
    res.cookie('visit',isNaN(req.cookies.visit)?1:parseInt(req.cookies.visit)+1);
    res.send(req.cookies.visit);
});
app.listen(8080);
