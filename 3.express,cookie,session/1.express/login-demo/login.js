/*需求：
* 实现一个注册登录的功功，描述如下：
 1.客户端以GET方法访问 /signup ,会返回一个注册的包含用户名和密码两个字段的空白表单
 2.填写这个空白表单，会向当前路径提交get请求，提交到后台后把此用户名和密码保存到用户数组里，然后重定向到登录页
 3.在登录页，填写用户名和密码，如果输入正确跳转到欢迎页，如果填写不正确返回登录页。
* */
var express=require('express');
var path=require('path');
var bodyParse=require('body-parser');
var app=express();
var users=[];

app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
// console.log(bodyParse.urlencoded({ extended: true }));//请求体格式是查询字符串格式
// console.log(bodyParse.json());//请求体格式是json格式
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/signup',function (req,res) {
    res.render('signup',{title:'用户注册'});
});
app.post('/signup',function (req,res) {
    users.push(req.body);//req.body==》获取到的请求主体内容
    res.redirect('/welcome');
});
app.get('/welcome',function (req,res) {
    res.render('welcome',{title:'欢迎'});
});
app.listen(8080);