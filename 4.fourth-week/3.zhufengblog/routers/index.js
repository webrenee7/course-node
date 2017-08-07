var express=require('express');
var Article=require('../model').Article;
var router=express.Router();
router.get('/',function (req,res) {
    var keyword=req.query.keyword;
    var query={};//查询的条件对象，如果关键字有值的话，给title赋值   等于一个正则表达式
    if(keyword){
        query.title=new RegExp(keyword);
    }
    //populate是填充的意思，把一个对象id类型的字符串转化成对应的真正的对象  article.author就从字符串的变成了用户对象了
    Article.find(query).populate('author').exec(function (err,articles) {
        // console.log(articles[0]);
        /*{ _id: 58b28bc87a907f2074bcb362,
         title: '1',
         content: '1',
         author: 58b246333d96ee1dfc5fc93c,
         __v: 0,
         time: 2017-02-26T08:00:56.158Z }
        */
        /*
         { _id: 58b28bc87a907f2074bcb362,
         title: '1',
         content: '1',
         author:
         { _id: 58b246333d96ee1dfc5fc93c,
         username: 'zx',
         password: '123',
         email: '123Qqq.com',
         avatar: '/uploads/e2bc9e0ea10169a0c0b695cd34ee355e',
         __v: 0 },
         __v: 0,
         time: 2017-02-26T08:00:56.158Z }
        **/
        res.render('index',{title:'首页',articles/*,keyword*/});
    });
    /*Article.find({},function (err,articles) {
        res.render('index',{title:'首页',articles});
    });*/
});

module.exports=router;