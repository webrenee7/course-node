var express=require('express');
var router=express.Router();//调用express的Router方法可以得到一个路由容器
router.get('/add',function (req,res) {
    res.end('添加文章');
});
router.get('/list',function (req,res) {
    res.end('查看文章列表');
});
router.get('/update',function (req,res) {
    res.end('修改文章');
});
router.get('/delete',function (req,res) {
    res.end('删除文章');
});
module.exports=router;