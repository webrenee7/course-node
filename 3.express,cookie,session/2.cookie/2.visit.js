var http = require('http');
var querystring = require('querystring');
http.createServer(function(req,res){
    var urlObj = require('url').parse(req.url);
    var pathname = urlObj.pathname;
    //当客户端请求路径为/write时，服务器向客户端种植cookie
    if(pathname =='/visit'){
        var cookie=req.headers.cookie;
        var visitVal=1;
        if(cookie){//不是第一次访问
            visitVal = querystring.parse(cookie,'; ','=')['visit'];
            visitVal++;
        }
        res.setHeader('Set-Cookie',"visit="+visitVal);//种植cookie
        res.end('欢迎第'+visitVal+'次访问');
    }else{
        res.end('404');
    }
    //正则方式：cookie.match(/visit=([^;]+))
}).listen(8080);
