var express=require('express');
var path=require('path');
var app=express();
var obj={name:'zfpx',age:8};
app.get('/',function (req,res) {
   res.end('首页')
});
app.get('/obj',function (req,res) {
    // res.end(obj);//First argument must be a string or Buffer  end只能返回字符串类型和Buffer格式的的数据
    res.send(obj);//send是express给res对象上增加的方法，支持任意类型的参数  对象 数字 字符串 Buffer，可以自动处理编码
});
app.get('/index',function (req,res) {
    //sendFile只支持绝对路径，三种方式请求到文件
    // res.sendFile(path.join(__dirname,'./index.html'));
    // res.sendFile(path.resolve('./index.html'));
    res.sendFile('./index.html',{root:__dirname});
});
app.all('/*',function (req,res) {
    //如果返回一个状态码的话，需要用sendStatus
    res.sendStatus(404);
});
app.listen(8080);