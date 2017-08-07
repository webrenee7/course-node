var express=require('express');
var app=express();
/*什么是中间件？
* 中间件就是处理HTTP请求的函数。用来完成各种特定的任务 比如检查用户是否登录、检测用户是否有权限访问等
* 特点：
* 1>.一个中间件处理完请求和响应可以把相应数据再传递给下一个中间件
* 2>.回调函数的next参数是一个函数，调用它表示调用后续的中间件,并将数据传递给下一个中间件.
* 3>.还可以根据路径来区分进行返回执行不同的中间件
* */
//如果访问的路径中存在username并且值为admin，就往下执行
app.use(function (req,res,next) {
    if(req.query.username=='admin'){//http://localhost/?username=admin
        next();
    }else{
        res.end('无权限访问！');
    }
});
//写一个中间件，算出请求到响应花费的时间
app.use(function (req,res,next) {
    req.start=Date.now();
    var myend=res.end;
    res.end=function () {//重写end方法
        var ts=Date.now()-req.start;
        console.log('cost'+ts+'ms');
        //修改this为res,把参数传送给end
        //ES6方法：Array.from(arguments)  将类数组转化为数组
        myend.apply(res,Array.from(arguments));
    };
    next();
});
app.use(function (req,res,next) {
    console.log(1);
    next('出错');//如果调用next的时候传递了参数就表示出错了，那么就会跳过正常的中间件或路由，执行错误处理中间件
});
//错误处理中间件
app.use(function (err,req,res,next) {
    res.status(500).send('Something broke!');
});
app.get('/',function (req,res) {
    res.end('首页');
});

app.listen(8080);