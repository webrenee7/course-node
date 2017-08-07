/*
 * /buy?name=iphone5
 * /cart  显示购物车购买的商品
 * */

var http=require('http');
var url=require('url');
var querystring=require('querystring');

/*http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    var query=urlObj.query;
    var goodsName=query.name;
    var cookieObj=querystring.parse(req.headers.cookie,'; ');
    if(pathname=='/buy'){
        res.setHeader('Set-Cookie','goods='+goodsName);//通过响应头写cookie  这种方式会覆盖
        res.end();
    }else if(pathname=='/cart'){
        res.end(cookieObj.goods);
    }
}).listen(8080);*/


http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    var query=urlObj.query;
    var goodsName=query.name;
    var cookieObj=querystring.parse(req.headers.cookie,'; ');
    var newCookie;
    if(pathname=='/buy'){
        if(cookieObj.goods){
            newCookie=cookieObj.goods+','+goodsName;
        }else{
            newCookie=goodsName;
        }
        res.setHeader('Set-Cookie','goods='+newCookie);
        res.end();
    }else if(pathname=='/cart'){
        res.end(cookieObj.goods);
    }
}).listen(8080);

