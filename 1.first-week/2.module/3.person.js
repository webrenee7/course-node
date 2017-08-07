var school={name:'zfpx',age:8};
module.exports=school;
/*
* module.exports与exports的区别？
* 在exports上增加属性可以导致module.exports的变化，但是更改exports的地址不会导致module.exports的变化，最终导出的是module.exports
 1.在exports上增加属性             导出多个
 2.直接更改module.exports的引用地址 导出唯一的一个
 * (function(require,exports,module,__filename,__dirname){
 *   module.exports = exports = {}
 *   module.exports = school;
 *   return module.exports;
 * })
* */

/*
 var a = b = {};
 b = 'zfpx';
 //想要改变a可以给b增加属性  或者直接改变a
 console.log(a);
 */