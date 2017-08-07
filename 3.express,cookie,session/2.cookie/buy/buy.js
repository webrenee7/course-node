/*
* /buy?name=iphone5
* /cart  显示购物车购买的商品
* */
var http=require('http');
var url=require('url');
var querystring=require('querystring');
var arr=[];
var i=0;
http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    var query=urlObj.query;
    if(pathname=='/buy'){
        if(req.headers.cookie){
            i++;
        }
        arr[i]=query["name"];
        res.setHeader('Set-Cookie','name='+arr);//通过响应头写cookie
        res.end();
    }else if(pathname=='/cart'){
        console.log(req.headers.cookie);
        var cookie=querystring.parse(req.headers.cookie,'; ','=')['name'];//通过请求头取cookie
        res.end(JSON.stringify(cookie));
    }
}).listen(8080);