//nextTick  把当前事件放到事件池中，等待执行
process.nextTick(function () {
    console.log('下一队列');
});

//exit  退出进程
var i=0;
setInterval(function () {
    i++;
    console.log(i);
    if(i==3){
        process.exit();
    }
},1000);

//pid  输出进程的id号
console.log(process.pid);

process.kill(6804);
