/*var arr=[1,2,3,4];
var obj={name:'zfpx',age:8};
//forEach只能遍历数组
//for-in可以遍历数组或对象
for(var key in obj){
    console.log(key);
}*/

//Object.keys(obj)  将对象的属性放到数组中
/*var obj={name:'zfpx',age:8};
console.log(Object.keys(obj));//[ 'name', 'age' ]*/

/*var attr=[1,2,3];
//reduce  从左往右迭代
//reduceRight  从右往左迭代
var result=attr.reduce(function (curr,item) {//当前值   当前元素
    return curr+item;
},0);
console.log(result);*/

//数组的最大值/最小值
var arr=[1,23,3,2,5,15,4,6,2,12,8];
var res=arr.reduce(function (curr,item) {
    return Math.max(curr,item);
});
console.log(res);
