var express=require('express');
var app=express();
//引入自己的模块
var user=require('./routers/user');
var article=require('./routers/article');
/*
 * 珠峰博客
 * 注册singup 登录signin 退出signout
 * 发表文章add  查看文章列表list  修改文章update  删除文章delete
 * */
/*
 * 路由中间件：
 * 它是一个中间件函数
 * 它是一个路由容器
 * */
//根据路径来区分执行不同的中间件
app.use('/user',user);//用户类的中间件
app.use('/article',article);//文章类的中间件
app.listen(8080);