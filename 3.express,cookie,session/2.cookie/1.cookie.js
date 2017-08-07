var http=require('http');
var url=require('url');
http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    if(pathname=='/write'){//当客户端请求路径为/write时，服务器向客户端种植cookie
        //通过响应头的Set-Cookie字段  值是key=value
        res.setHeader('Set-Cookie',"name=zfpx");
        res.end();
    }else if(pathname=='/read'){//当客户端请求路径为/write时，服务器向客户端种植cookie
        res.end(req.headers.cookie);//visit=5; name=zfpx
    }
}).listen(8080);