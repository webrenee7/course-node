//引入模块
var express=require('express');
var path=require('path');
var index=require('./routers/index');
var user=require('./routers/user');
var article=require('./routers/article');
var bodyParser=require('body-parser');
var session=require('express-session');
//重启服务器会导致内存清空，session也会丢失
//可以把会话信息放到文件或数据库中
var MongoStore=require('connect-mongo')(session);
//
var flash=require('connect-flash');

//调用express返回app
var app=express();

//设置模板引擎
app.set('view engine','html');//设置使用模板引擎的后缀
app.set('views',path.resolve('views'));//设置模板的存放目录
app.engine('html',require('ejs').__express);//用哪种文件渲染模板

//指定静态文件根目录
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));

//使用中间件
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var url=require('./config').url;
app.use(session({
    resave:true,//重新保存
    saveUninitialized:true,//保存未初始化的session
    secret:'zfpx',//加密cookie
    store:new MongoStore({//指定会话的存储位置
        url
    })
}));

//使用flash中间件
/*
* 参数1：消息类型
* 参数2：消息内容
* */
app.use(flash());

//使用自定义中间件
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    //把写入flash的消息取出来，赋给res.locals对象，就可以在模板中使用了
    //flash里的消息，一旦取值，就立刻被销毁
    res.locals.success = req.flash('success').toString();//req.flash('error','登录失败！');是个数组
    res.locals.error = req.flash('error').toString();
    res.locals.keyword = '';
    next();
});

//使用路由中间件
app.use('/',index);
app.use('/user',user);
app.use('/article',article);

//监听80端口
app.listen(80);