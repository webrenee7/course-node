# 1. MongoDB
## 1.1 MongoDB安装
MongoDB64位绿色版 http://pan.baidu.com/s/1cMM9oq

mongo客户端 http://pan.baidu.com/s/1kUIQlUZ

## 1.2 MongoDB启动与连接
找到MongoDB安装目录，右键+shift，打开命令窗口
- 启动服务器端
```
mongod --dbpath=./data
```
如果出现waiting for connections on port 27017就表示启动成功,已经在27017端口上监听了客户端的请求
找到mongodb安装目录，右键+shift，打开命令窗口

- 启动客户端
```
mongo或者mongo --host=127.0.0.1
```
--host后的值表示服务器的ip地址 备注： --host=127.0.0.1 表示的就是本地服务器,每次数据库都会默认连接test数据库

## 1.3 MongoDB命令
- 查看当前连接的数据库
```
db
```
test  默认连接

- 切换数据库
```
use 201613node
```
如果没有会自动创建

- 在数据库中插入一个集合
```
db.stu.insert({id:1,name:'zfpx'})
```

- 查看当前集合下所有的文档
```
db.stu.find()
```
{ "_id" : ObjectId("58b0eafd833d79803225aecd"), "id" : 1, "name" : "zfpx" }
_id ： 主键  确保唯一性

# 2.Mongoose
> Mongoose是MongoDB的一个对象模型工具 同时它也是针对MongoDB操作的一个对象模型库,封装了MongoDB对文档的的一些增删改查等常用方法 让NodeJS操作Mongodb数据库变得更加灵活简单

## 2.1 Mongoose安装
```
npm install mongoose
```

## 2.2 连接数据库
```
//mongoose.connect("mongodb://localhost:端口号/数据库名称");
mongoose.connect('mongodb://localhost/201613node');
```

## 2.3 定义集合的骨架模型
规定了集合中文档的字段名和字段类型
```
var PersonSchema=new mongoose.Schema({
    name:String,//name字段的类型必须为String
    age:Number,
    home:String
});
```

## 2.4 定义对象模块
```
var Person=mongoose.model('Person',PersonSchema);
```

## 2.5 Mongoose基本操作
### 2.5.1 添加 create
```
Person.create({id:2,name:'zfpx2',home:'abc'},function (err,result) {
    console.log(result);//{ __v: 0, name: 'zfpx', _id: 58b0f1bcfbaaeb11608c891b }
});
```
- 如果传的类型多于schema的定义，那么多余的字段会被忽略掉。
- 如果传入的值和schema规定的类型不匹配，那么mongoose会尝试进行数据类型转换，如果转换成功，则成功保存，如果转换失败，则保存失败

### 2.5.2 查询 find
```
Person.find({name:'zfpx2'},{name:1},function (err,docs) {//
    console.log(docs);
    //结果：[ { _id: 58b0f98c83172f05fc9a4840, name: 'zfpx2' } ]  是个集合，如果查不到，是[]
    console.log(err);
});
```
- 参数1：查询条件
- 参数1：规定查询出来的字段的个数
    - :1表示只查询此字段，其他字段均忽略掉不返回
    - :0表示只排除掉这个字段，其他字段均返回
    - 0和1不能混用，否则报错：Can't canonicalize query: BadValue Projection cannot have a mix of inclusion and exclusion.
    - id特殊
- 参数3：回调函数  参数：错误对象，查询到的结果

### 2.5.3 修改 update
默认只更新第一条匹配的数据
```
Person.update({name:'zfpx2'},{name:'zfpx3'},{multi:true},function (err,result) {
    console.log(result);
    //  { ok: 1, nModified: 3, n: 3 }
    //ok=1      成功
    //nModified 修改的条数
    //n         查找匹配到的条数
});
```

- 参数1：更新的条件
    - {age:50}  等于
    - {age:{$gt:50}}    大于
    - {age:{$gte:50}}  大于等于
    - {age:{$lt:50}}  小于
    - {age:{$lte:50}}  小于等于
    - {age:{$in:[50,100]}}  在一个范围内
- 参数2：更新的内容
- 参数3：{multi:true}  匹配所有条数
- 参数4：回调函数  参数：错误对象，更新的结果

### 2.5.4 删除 remove
默认会删除全部匹配的数据
```
Person.remove({name:'zfpx3'},function (err,result) {
    console.log(err);
    console.log(result);//{ ok: 1, n: 4 },
});
```
- 参数1：删除的条件
- 参数2：回调函数  参数：错误信息，删除的结果

## 2.6 Mongoose基本查询
### 2.6.1 findById
根据ID查找
```
Person.findById('58b0f1bcfbaaeb11608c891b',function (err,doc) {
    console.log(err);//null
    console.log(doc);//{ _id: 58b0f1bcfbaaeb11608c891b, name: 'zfpx', __v: 0 }
});
```

### 2.6.2 find
根据条件查询所有符合条件的数据
```
Person.find({username:'zfpx',password:123},function (err,docs) {
    console.log(docs);//查询所有符合条件的记录  结果是个数组。如果没查到，返回[]
});
```

### 2.6.3 findOne
查询一条符合条件的数据
```
Person.findOne({username:'zfpx',password:123},function (err,docs) {
    console.log(docs);//结果是个对象。如果没查到，返回null
});
```

## 2.7 Mongoose高级查询
```
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

//创建数据
var users=[];
for(var i=0;i<10;i++){
    users.push({name:'zfpx'+(i+1),age:i+1});
}

//插入数据
User.create(users,function (err,docs) {
    console.log(docs);
});

//分页查询
var pageNum=3;//查询第几页
var pageSize=3;//查询每页的条数
//跳过前6条，，取3条
User.find({},{name:1})
    .sort({age:1})//排序  按照age字段，正序排列
    .skip((pageNum-1)*pageSize)//跳过指定的条数
    .limit(pageSize)//限定返回的条数
    .exec(function (err,docs) {
        console.log(err);
        console.log(docs)
    });
```