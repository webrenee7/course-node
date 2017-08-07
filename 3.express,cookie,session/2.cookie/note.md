## cookie
> HTTP1.0中协议是无状态的，但在WEB应用中，在多个请求之间共享会话是非常必要的，所以出现了Cookie
  cookie是为了辩别用户身份，进行会话跟踪而存储在客户端上的数据

### cookie的处理流程
- 第一次客户端向服务器发送请求
- 服务器通过响应头的Set-Cookie向客户端种植cookie
- 客户端再向服务器发送请求时，带上Cookie请求头
- 服务器通过读取请求头中的Cookie并进行相应

## cookie原理
- 种植cookie
```
 res.setHeader('Set-Cookie',"name=zfpx");
```

- 获取cookie
```
//req.headers.cookie  获取到的形式==》visit=5; name=zfpx，所以要转化为对象
querystring.parse(req.headers.cookie,'; ','=')
```

## 案例-根据cookie判断用户第几次访问当前页面
```
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
}).listen(8080);

```

### express使用cookie
- 引用第三方中间件cookie-parser
```
var cookieParser=require('cookie-parser');
app.use(cookieParser());
```

- 种植cookie
```
res.cookie('name','zfpx');
```

- 获取cookie
```
req.cookies
```

### 案例-express统计用户第几次访问当前页面
```
var express = require('express');
var app=express();
var cookieParser=require('cookie-parser');
app.use(cookieParser());
app.get('/visit',function(req,res){
    res.cookie('visit',isNaN(req.cookies.visit)?1:parseInt(req.cookies.visit)+1);
    res.send(req.cookies.visit);
});
app.listen(80);
```

### cookie的重要属性
```
res.cookie([key],[value],{domain|path|expires|maxAge|httpOnly});
//第三个参数是个对象，用来规定cookie种植的条件
```

- domain==>域名
```
res.cookie('name','zfpx',{domain:'a.zfpx.cn'});
```

- path==>路径
```
res.cookie('name','zfpx',{path:'/read'});
```

- expires==>过期时间
```
res.cookie('name','zfpx',{expires:new Date(Date.now()+10*1000)});
```

- maxAge==>有效时间
```
res.cookie('name','zfpx',{maxAge:10*1000});
```

- httpOnly==>不允许js访问cookie
```
res.cookie('name','zfpx',{httpOnly:true});
```

### 使用cookie的注意事项
- 可能被客户端篡改，使用前验证合法性
- 不要存储敏感数据，比如用户密码，账户余额
- 使用httpOnly保证安全
- 尽量减少cookie的体积
- 设置正确的domain和path，减少数据传输