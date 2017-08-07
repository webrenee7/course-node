/*
* get /signup  显示空白注册表单
* post /signup  处理客户端提交的注册POST请求，并把次用户保存在用户数组中，并跳转登录页
*       1.不再操作cookie,而是读写session
*       2.如果操作失败，需要返回上一个页面，需要页面中显示失败的原因
* get /signin  显示空白的登录表单
* post /signin  处理客户端登录的POST请求，判断用户是否合法，合法就跳转到欢迎页
* get /welcome  显示到欢迎页
* */
var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var app=express();
var users=[];
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve('public')));
app.use(session({
    resave:true,//每次访问服务器，重新保存session
    saveUninitialized:true,//保存未初始化的session
    secret:'zfpx'//用来加密cookie
}));
app.get('/signup',function (req,res) {
    //显示空白的注册表单
    res.render('signup',{title:'注册',error:req.session.error,function(){
        console.log(1,req.session.error);
        req.session.error=null;
        console.log(2,req.session.error);
    }});
});
app.post('/signup',function (req,res) {
    //处理客户端提交的注册POST请求，并把次用户保存在用户数组中，并跳转登录页
    var user=req.body;//得到请求体
    var result=users.find(function (item) {//在原数组中找，有没有跟请求体一样的用户名(不能用for循环，不能多次end,send/redirect自带end)
        return item.username==user.username;
    });
    if(result){//如果有
        req.session.error='已经注册过该用户，请重新注册！';
        res.redirect('back');//返回注册页，重新注册
    }else{//如果没有
        users.push(user);//将请求体放到数组中
        req.session.error='注册成功！！';
        res.redirect('/signin');//然后跳转到登录页
    }
});
app.get('/signin',function (req,res) {
    //显示空白的登录表单
    res.render('signin',{title:'登录'});
});
app.post('/signin',function (req,res) {
    //处理客户端登录的POST请求，判断用户是否合法，合法就跳转到欢迎页
    var user=req.body;
    var result=users.find(function (item) {
        return item.username==user.username&&item.password==user.password
    });
    if(result){
        req.session.username=user.username;
        // res.cookie('username',user.username);//只需要存用户名
        // res.cookie('password',user.password);//存密码不安全
        res.redirect('/welcome');
    }else{
        res.redirect('back');
    }
});
function checkLogin(req,res,next) {
    if(req.session.username){
        next();
    }else{
        res.redirect('/signin');
    }
}
app.get('/welcome',checkLogin,function (req,res) {
    //显示欢迎页
    console.log(req.session.username);
    res.render('welcome',{title:'欢迎',username:req.session.username});
});
app.listen(8080);