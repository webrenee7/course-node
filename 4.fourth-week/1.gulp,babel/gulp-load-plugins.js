//模拟gulp-load-plugins这个插件
function load() {
    var $={};
    var package=require('./package.json');
    var devs=package.devDependencies;
    for(var key in devs){
        // if(key.indexOf('gulp-')){
        //forEach 循环数组？？不能循环对象
        //Object.keys(dev).forEach(function () {});//Object.keys(dev)获取dev对象属性的数组  es5
        // if(/^gulp-/.test(key)){
        if(key.startsWith('gulp-')){
            $[transKey(key)]=require(key);
        }
    }
    return $
}
//将模块名转换为驼峰命名形式  gulp-concat===>gulpConcat
function transKey(attr) {
    return attr.slice(5).replace(/-(\w)/g, function () {
        return arguments[1].toUpperCase();
    })
}
module.exports=load;













/*
module.exports = function () {
    var $ = {};
    var package = require('./package.json');
    var devDependencies = package.devDependencies;
    for (var attr in devDependencies) {//循环每个开发依赖
        if (attr.startsWith('gulp-')) {//如果属性名是以gulp-开头的话,加载此模块并赋给$的属性  minifyHtml minify-html
            $[toKey(attr)] = require(attr);
        }
    }
    return $;
};
//把模块名转成属性名
function toKey(attr) {
    return attr.slice(5).replace(/-(\w)/g, function () {
        return arguments[1].toUpperCase();
    })
}*/
