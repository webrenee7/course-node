/*什么是express?
* express是一个基于Node.js的web应用开发框架，是目前最流行的基于Node.js的web开发框架，它提供一系列强大的功能，例如：
* 1>.路由控制
* 2>.参数获取
* 3>.中间件
* 4>.send和sendFile
* 5>.静态文件服务
* 6>.模板解析
* 7>.重定向
* */
//1、引入express模块
var express=require('express');
//2、执行express会返回一个函数
var app=express();//app的本质是一个请求监听函数，每当请求来的时候就会执行。上面有一些属性和方法供我们使用，例如：get,post,head,delete,put,use,engine等等

//3、配置路由
//路由控制：根据客户端不同的请求，返回不同的响应
//所有的路由会组成一个数组，匹配的时候，从上往下依次匹配，如果我们的方法名和路径都匹配上了，则执行我们的监听函数，并结束响应，如果有任何一个没有匹配上，则往下继续匹配，如果都没匹配上，则报错：Cannot http方法  路径
app.get('/',function (req,res) {
    res.end('首页');
});
app.get('/about',function (req,res) {
    res.end('关于我们');
});
//发送post请求  curl -X POST http://localhost:9090/user
app.post('/user',function (req,res1) {
    res.end('post user');
});
//all表示匹配所有的方法   *表示匹配所有的路径
app.all('/*',function (req,res) {//all不是app请求方法  注意顺序，一定要放到最后
    res.end('路径不存在!');
});

//4、创建服务，监听端口
app.listen(8080);//app.listen是对http创建服务，并监听端口方法的封装