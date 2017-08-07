var express=require('express');
var url=require('url');
var app=express();
app.get('/users/:id',function (req,res) {
    //原生Node.js获取参数的方法
    // console.log(url.parse(req.url,true).pathname);//文件路径
    // console.log(url.parse(req.url,true).query);//查询字符串

    //express获取参数的方法
    //localhost:8090/users/12?order=23
    console.log('请求方式:'+req.method);
    console.log('域名:'+req.headers.host.split(':')[0]);
    console.log('端口号:'+req.headers.host.split(':')[1]);
    console.log('文件路径:'+req.path);
    console.log('查询字符串:'+req.query.order);
    console.log('参数中的用户id:'+req.params.id);
    res.end();
});
app.listen(8080);
