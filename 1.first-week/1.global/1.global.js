console.log(this);//this==>{}
(function () {
    console.log(this);//this==>global    闭包将this改变了
})();

/*在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
* process  进程对象
* Buffer  缓存区
* setImmediate: [Function], 立即执行
* clearImmediate: [Function], 清除立即执行

* setTimeout: [Function],  指定毫秒数之后执行
* clearTimeout: [Function], 清除setTimeout设置的定时器
*
* setInterval: [Function],  每隔指定毫秒数之后执行
* clearInterval: [Function],  清除clearInterval设置的定时器
*
* console方法：
* console.log()  输出日志，
* console.info()  输出信息性消息。 蓝色叹号
* console.error()  输出错误消息的。控制台在出现错误时会显示是红色的叉子。
* console.warn()  输出警告消息。控制台出现有黄色的惊叹号。
* console.time()  输出时间，表示计时开始。
* console.timeEnd()  输出时间，表示计时结束。
* */