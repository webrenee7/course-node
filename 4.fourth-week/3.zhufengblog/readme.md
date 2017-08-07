# 珠峰博客
珠峰博客是一个集注册，登录，上传头像，发表文章，退出，查看文章列表，分页，查询，评论等功能的博客

# 初始化
```
npm init -y
```

# 安装依赖的模块
```
npm install express bootstrap jquery body-parser express-session multer connect-flash connect-mongo morgan debug mongoose --save
```

# 配置路由(使用路由中间件)
- 用户相关
```
/user/signup 注册
/user/signup 登录
/user/signup 退出
```

- 文章相关
```
/article/add 添加文章
/article/list 查看文章列表
```

## 上传文件
安装multer
```
npm install multer --save
```

- 上传文件
```
var multer=require('multer');
var upload=multer({dest:'./public/uploads'});
router.post('/signup',upload.single('avatar'),function(req,res){
    //avatar是上传表单的文件字段的name属性
    //single表示上传的表单只有一个文件字段
    console.log(req.file);
    { fieldname: 'avatar',//form表单中的字段名
      originalname: 'Desert.jpg',//上传文件的原始名称
      encoding: '7bit',
      mimetype: 'image/jpeg',//内容类型
      destination: './public/uploads',//上传文件的目录
      filename: 'cba161a579195c0782c9b7e023813dae',//上传后的文件名
      path: 'public\\uploads\\cba161a579195c0782c9b7e023813dae',//上传文件的路径
      size: 845941 }
})
```

- 获取上传后的文件路径
```
user.avatar=`/uploads/${req.file.filename}`;
```

## 给模板变量赋值
- 写在render的第二个参数中 (优先级高)
- 给res.locals赋值
真正渲染模板的对象就是req.locals，render的时候，会把数据对象的属性拷贝到res.locals对象上，然后用res.locals进行渲染
```
res.locals.user=req.session.user;
```
通用的用res.locals
不通用的放路由中
res.locals原理

## connect-mongan
```
//重启服务器会导致内存清空，session也会丢失
//可以把会话信息放到文件或数据库中
var MongoStore=require('connect-mongo')(session);
```

```
var url=require('./config').url;
app.use(session({
    resave:true,//重新保存
    saveUninitialized:true,//保存未初始化的session
    secret:'zfpx',//加密cookie
    store:new MongoStore({//指定会话的存储位置
        url
    })
}));
```

##
