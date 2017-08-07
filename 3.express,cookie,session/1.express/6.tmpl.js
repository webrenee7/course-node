//模板引擎：模板+数据+渲染
var express=require('express');
var path=require('path');
var app=express();
//1.定义数据
var title="模板引擎";
var users=[
    {name:'zfpx1',id:1},
    {name:'zfpx2',id:2},
    {name:'zfpx3',id:3}
];

//2.设置模板
//1>.指定渲染模板文件的后缀名为html
app.set('view engine','html');  //view engine==>定死的，不能改
//2>.设置模板引擎的绝对路径
app.set('views',path.resolve('views'));
//3>.修改模板引擎的后缀
app.engine('html',require('ejs').__express);

//3.渲染视图
app.get('/user',function (req,res) {
    res.render('user',{title,users});
});
app.listen(8080);