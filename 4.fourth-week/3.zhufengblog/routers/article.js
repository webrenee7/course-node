var express=require('express');
var Article=require('../model').Article;
var router=express.Router();
router.get('/add',function (req,res) {
    res.render('article/add',{title:"发表文章",article:[]});
});
router.post('/add',function (req,res) {
    var article=req.body;
    article.author=req.session.user._id;//存储的时候，存的就是ID
    Article.create(article,function (err,result) {
        if(err){
            req.flash('error','发表文章失败！');
            res.redirect('back');
        }else{
            req.flash('success','发表文章成功！');
            res.redirect('/');
        }
    });
});
//显示详情页
router.get('/detail/:_id',function (req,res) {
    var _id=req.params._id;
    Article.findById(_id,function (err,article) {
        res.render('article/detail',{title:'文章详情页',article});
    });
});
//删除文章
router.get('/delete/:_id',function (req,res) {
    var _id=req.params._id;
    Article.remove({_id},function (err,result) {
        if(err){
            req.flash('error','删除失败！');
            res.redirect("back");
        }else{
            req.flash('success','删除成功！');
            res.redirect("/");
        }
    });
});
//修改文章
router.get('/update/:_id',function (req,res) {
    var _id=req.params._id;
    Article.findById(_id,function (err,article) {
        res.render('article/add',{title:'文章详情页',article});
    });
});
router.post('/update/:_id',function (req,res) {
    var _id=req.params._id;
    var article=req.body;
    Article.update({_id},article,function (err,result) {
        if(err){
            req.flash('error','修改失败！');
            res.redirect('back');
        }else{
            req.flash('success','修改成功！');
            res.redirect('/article/detail/'+_id);
        }
    });
});
router.get('/list',function (req,res) {
    res.send('查看文章列表');
});
module.exports=router;