//引入mongoose
var mongoose=require('mongoose');
mongoose.Promise=Promise;
var url=require('./config').url;
var ObjectId=mongoose.Schema.Types.ObjectId;//对象Id类型  外键
//连接数据库
mongoose.connect(url);

//1、用户
//定义骨架模型
var UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
//定义模型
var User=mongoose.model('User',UserSchema);
//导出User
// module.exports=User;
exports.User=User;

//2、文章
//定义骨架模型
var ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    //ObjectId  对象id类型  如果这个字段引用的是另外一个集合的主键的话，就是对象id类型，它是外键  引用的是User模型对应的集合的主键
    author:{type:ObjectId,ref:'User'},
    // time:Date,
    createTime:{type:Date,default:Date.now()}//如果没传，给默认值
});
//定义模型
var Article=mongoose.model('Article',ArticleSchema);
//导出User
// module.exports=User;
exports.Article=Article;