var mongoose=require('mongoose');
mongoose.Promise=Promise;
//连接数据库
mongoose.connect('mongodb://localhost/201613node');
//定义Schema
var UserSchema=new mongoose.Schema({
    name:String,
    age:Number
});
//定义Model
var User=mongoose.model('User',UserSchema);
var users=[];
for(var i=0;i<10;i++){
    users.push({name:'zfpx'+(i+1),age:i+1});
}
//插入数据
User.create(users,function (err,docs) {
    console.log(docs);
});

/*
* 分页查询
* pageNum  查询第几页
* pageSize  查询每页的条数
* */
var pageNum=3;
var pageSize=3;
//跳过前6条，，取3条
User.find({},{name:1})
    .sort({age:1})//排序  按照age字段，正序排列
    .skip((pageNum-1)*pageSize)//跳过指定的条数
    .limit(pageSize)//限定返回的条数
    .exec(function (err,docs) {
        console.log(err);
        console.log(docs)
    });