var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
app.use(cookieParser());
/*
* 第一次光临，送一张100元理发卡
* 第二次光临，余额90..
* 第三次光临，余额80..
* */
const SESSION_KEY='connect.sid';//定义常量
var sessions={};//在内存开辟一段区域
app.get('/visit',function (req,res) {
    //sessionId其实就是卡号
    var sessionId=req.cookies[SESSION_KEY];
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
app.listen(8080);