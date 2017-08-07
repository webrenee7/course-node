var cache=require('./1.cache');
console.log(cache);//{}
console.log(require);
delete require.cache["E:\\珠峰培训\\www_node\\1.global-week\\2.module\\1.cache.js"];//删除缓存
console.log(require);
//同步的将文件读取过来 io操作 进行执行
//require中的缓存，多次引用，先看缓存中是否加载过此模块，加载过不会再继续加载
//E:\\珠峰培训\\www_node\\1.first-week\\2.module\\1.cache.js