## session
> session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了

## session的原理(基于cookie)

```
/*需求：
* 第一次光临，送一张100元理发卡
* 第二次光临，余额90..
* 第三次光临，余额80..
* */
var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
app.use(cookieParser());

const SESSION_KEY='connect.sid';//定义常量
var sessions={};//在内存开辟一段区域
app.get('/visit',function (req,res) {
    var sessionId=req.cookies[SESSION_KEY];//sessionId其实就是卡号
    if(sessionId){//如果有卡号，表示是老顾客
        //通过卡号把卡号对应的对象从sessions对象取出来
        var sessionObj=sessions[sessionId];
        //在原来基础上减去10元
        sessionObj.balance-=10;
        res.end('欢迎您再次光临，您卡里的余额还剩'+sessionObj.balance+"元");
    }else{//如果没有卡号，新顾客，办卡
        //卡号要求是唯一的，并且不容易被猜到
        sessionId=''+Date.now()+Math.random();//变成字符串
        sessions[sessionId]={balance:100};//在服务器端记录此卡号对应的信息
        res.cookie(SESSION_KEY,sessionId);//把此卡号通过cookie发送给客户端
        res.end('欢迎你初次光临，送你一张100元理发卡');
    }
});
app.listen(80);
```

## express中session的使用
```
var express=require('express');
//1、引入第三方中间件express-session
var session=require('express-session');
var app=express();

//2、使用express-session
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
app.listen(80);
```

## cookie与session区别
- cookie数据存放在客户的浏览器上，session数据放在服务器上。
- cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗 考虑到安全应当使用session
- session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面,应当使用COOKIE
- 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie