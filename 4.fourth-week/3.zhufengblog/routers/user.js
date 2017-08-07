var express=require('express');
var router=express.Router();
var User=require('../model').User;
//引入multer中间件
var multer=require('multer');
//指定上传路径
var upload=multer({dest:'./public/uploads'});
router.get('/signup',function (req,res) {
    res.render('user/signup',{title:'注册'/*,user:req.session.user*/});
    /*
    给模板变量赋值
    - 写在render的第二个参数中
    - 给res.locals赋值
    真正渲染模板的对象就是req.locals，render的时候，会把数据对象的属性拷贝到res.locals对象上，然后用res.locals进行渲染
    res.locals.user=req.session.user;
    */
});
//在路由中使用中间件
router.post('/signup',upload.single('avatar'),function (req,res) {
    var user=req.body;
    // console.log(req.file);
    /*
     { fieldname: 'avatar',//form表单中的字段名
     originalname: 'Desert.jpg',//上传文件的原始名称
     encoding: '7bit',
     mimetype: 'image/jpeg',//内容类型
     destination: './public/uploads',//上传文件的目录
     filename: 'cba161a579195c0782c9b7e023813dae',//上传后的文件名
     path: 'public\\uploads\\cba161a579195c0782c9b7e023813dae',//上传文件的路径
     size: 845941 }
    * */
    user.avatar=`/uploads/${req.file.filename}`;//上传后的文件路径
    User.create(user,function (err,result) {
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/user/signin');
        }
    })
});
router.get('/signin',function (req,res) {
    res.render('user/signin',{title:'登录'});
});
router.post('/signin',function (req,res) {
    var user=req.body;
    User.findOne(user,function (err,doc) {
        // console.log(err);//null
        //如果没查到也是成功，只有数据库操作失败才有错误  err不为null
        // console.log(doc);
        if(err){
            req.flash('error','登录失败！');//两个参数==》赋值
            // req.flash('error');//一个参数==》取值
            res.redirect('back');
        }else{
            if(doc){//如果成功了，doc可能是null，也可能是对象
                req.flash('success','登录成功！');
                req.session.user=doc;
                res.redirect('/');
            }else{
                res.redirect('back');
            }
        }
    })
});
router.get('/signout',function (req,res) {
    req.session.user=null;//清空session
    // res.render('user/signout',{title:'退出'});
    res.redirect('/user/signin');
});
module.exports=router;