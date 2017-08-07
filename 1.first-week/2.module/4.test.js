/*
var obj={name:'zfpx',age:8};
obj2=obj;//把obj的地址给了obj2
// obj2.name="haha";//这样修改会导致obj也发生变化
obj2={name:'haha',price:123};//这样修改，相当于obj2另起炉灶，不会到影响obj
console.log(obj);*/

module.exports=exports={};//module.exports与exports公用一个地址
exports={name:'zfpx',age:8};//exports指向了一个新地址不会影响到module.exports，module.exports还是等于{}
// module.exports={name:'zfpx',age:8};
//return module.exports  return 的是module.exports  所以
console.log(module.exports);//==>{}

