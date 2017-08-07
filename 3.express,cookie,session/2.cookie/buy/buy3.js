var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
/*
* [{name:'iphone5',amount:2}]
* */
app.use(cookieParser());
app.get('/buy',function (req,res) {
    //先取得客户端传的cookie对象
    var cookies=req.cookies;
    //初始化一个默认对象
    var currentGoods={name:req.query.name,amount:1};
    //先声明一个最终保存的json数组
    var allGoods;
    if(cookies.goods){//如果以前有商品
        allGoods=JSON.parse(cookies.goods);//把这个字符串转化为JSON数组
        var result=allGoods.find(function (item) {//在原来的数组中查找，有没有跟这次购买的商品一样名称的商品
            return item.name==currentGoods.name;
        });
        if(result){//如果有的话
            result.amount++;//在原来的商品数量上累加1
        }else{//如果没有的话
            allGoods.push(currentGoods);//将该商品信息添加到数组末尾
        }
    }else{//如果以前没有商品
        allGoods=[currentGoods];//直接将该商品信息放到数组中
        res.cookie('goods',JSON.stringify(allGoods));
    }
    res.end('ok');
});
app.get('/cart',function (req,res) {
    res.send(req.cookies.goods);
});
app.listen(8080);