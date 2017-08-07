/*
* util:工具方法
* */
var util=require('util');
// console.log(util);
/* util上的一些方法：
* isArray: [Function: isArray],
 isBoolean: [Function: isBoolean],
 isNull: [Function: isNull],
 isNullOrUndefined: [Function: isNullOrUndefined],
 isNumber: [Function: isNumber],
 isString: [Function: isString],
 isSymbol: [Function: isSymbol],
 isUndefined: [Function: isUndefined],
 isRegExp: [Function: isRegExp],
 isObject: [Function: isObject],
 isDate: [Function: isDate],
 isError: [Function: isError],
 isFunction: [Function: isFunction],
 isPrimitive: [Function: isPrimitive],
 isBuffer: [Function: isBuffer],
 log: [Function],
 inherits: [Function],
 _extend: [Function],
 print: [Function: deprecated],
 puts: [Function: deprecated],
 debug: [Function: deprecated],
 error: [Function: deprecated],
* */
function Parent() {
    this.x=100;
}
Parent.prototype.getX=function () {
    console.log("哈哈");
};
function Child() {
    this.y=200;
}
util.inherits(Child,Parent);//node中的继承==>util.inherits   只继承原型上的
var child=new Child();
console.log(child.x);//undefined
child.getX();//"哈哈"

console.log(util.isNumber("ds"));//false
console.log(util.isArray([]));//true