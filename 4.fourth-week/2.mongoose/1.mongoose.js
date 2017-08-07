//1、导入mongoose模块
var mongoose=require('mongoose');

//2、连接数据库
//mongoose.connect("mongodb://localhost:端口号/数据库名称");
mongoose.connect('mongodb://localhost/201613node');

//3、定义集合的骨架模型（规定了集合中文档的字段名和字段类型）
var PersonSchema=new mongoose.Schema({
    name:String,//name字段的类型必须为String
    age:Number,
    home:String
});

//4、根据schema定义操作数据库的对象模型
/*
集合名词=模型吗--》小写--》复数
Person-->person-->people
*/
var Person=mongoose.model('Person',PersonSchema);


//5、向集合添加文档
/*
- 如果传的类型多于schema的定义，那么多余的字段会被忽略掉。
- 如果传入的值和schema规定的类型不匹配，那么mongoose会尝试进行数据类型转换，如果转换成功，则成功保存，如果转换失败，则保存失败
*/
/*Person.create({id:2,name:'zfpx2',home:'abc'},function (err,result) {
    console.log(result);//{ __v: 0, name: 'zfpx', _id: 58b0f1bcfbaaeb11608c891b }  _v是版本号
});*/


//6、查询
/*
* 参数1：查询条件
*   {}查询所有条件
* 参数2: 规定查询出来的字段的个数/名词
*   :1表示只查询此字段，其他字段均忽略掉不返回
*   :0表示只排除掉这个字段，其他字段均返回
*      ps:0和1不能混用，否则报错：Can't canonicalize query: BadValue Projection cannot have a mix of inclusion and exclusion.
*         id特殊
* 参数3：回调函数  参数：错误对象，查询到的结果
* */

/*Person.find({name:'zfpx2'},{name:1},function (err,docs) {//
    console.log(docs);//[ { _id: 58b0f98c83172f05fc9a4840, name: 'zfpx2' } ]  是个集合
    console.log(err);
});*/

//7、修改
/*默认只更新第一条匹配的数据
* 参数1：更新的条件
*       {age:50}  等于
*       {age:{$gt:50}}  $gt  大于
*       {age:{$gte:50}}  $gte 大于等于
*       {age:{$lt:50}}  $lt  小于
*       {age:{$lte:50}}  $lte 小于等于
*       {age:{$in:[50,100]}}  $in 在一个范围内
* 参数2：更新的内容
* 参数3：{multi:true}  匹配所有条数
* 参数4：回调函数  参数：错误对象，更新的结果
* 结果：{ ok: 1, nModified: 1, n: 1 }
*       ok=1      成功
*       nModified 修改的条数
*       n         查找匹配到的条数
* */
/*Person.update({name:'zfpx2'},{name:'zfpx3'},{multi:true},function (err,result) {
    console.log(result);//{ ok: 1, nModified: 1, n: 1 }   { ok: 1, nModified: 3, n: 3 }
});*/

//8、删除
/*默认会删除全部匹配的数据
* 参数1：删除的条件
* 参数2：回调函数  参数：错误信息，删除的结果
* */
Person.remove({name:'zfpx3'},function (err,result) {
    console.log(err);// result: { ok: 1, n: 4 },
    console.log(result);
});

//findById根据id查找符合条件的数据
/*Person.findById('58b0f1bcfbaaeb11608c891b',function (err,doc) {
    console.log(err);//null
    console.log(doc);//{ _id: 58b0f1bcfbaaeb11608c891b, name: 'zfpx', __v: 0 }
});*/

//find根据条件查询所有符合条件的数据
Person.find({username:'zfpx',password:123},function (err,docs) {
    console.log(docs);//查询所有符合条件的记录  结果是个数组。如果没查到，返回[]
});

//findOne查询一条符合条件的数据
Person.findOne({username:'zfpx',password:123},function (err,docs) {
    console.log(docs);//结果是个对象。如果没查到，返回null
});