var express=require('express');
var router=express.Router();//调用express的Router方法可以得到一个路由容器
router.get('/signup',function (req,res) {
    res.end('注册');
});
router.get('/signin',function (req,res) {
    res.end('登录');
});
router.get('/signout',function (req,res) {
    res.end('退出');
});
module.exports=router;