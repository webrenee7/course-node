var express=require('express');
var path=require('path');
var app=express();
//静态文件服务  静态文件==>css js imgs
//指定静态文件中间件，用来处理静态文件
//当接到客户端的请求后，会去静态文件根目录下找有没有这个文件，如果有则把它从硬盘上读出来返回给客户端，如果没有，则调用next向下继续匹配
app.use(express.static(path.resolve('public')));//可以写多个静态文件中间件
app.get('/',function (req,res) {
   res.sendFile('./index.html',{root:__dirname});
});
app.listen(8080);