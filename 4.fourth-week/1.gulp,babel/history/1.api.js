var gulp=require('gulp');
//第一个参数：任务的定义
//第二个参数：任务定义函数

//1、gulp.task  定义任务
gulp.task('hello',function () {
    console.log('hello');
});
//执行 gulp hello

//2、gulp.src()方法获取到想要处理的文件流
//3、gulp.dest()方法则把流中的内容写入到文件中
gulp.task('copy',function () {
    gulp.src('./app/index.html')//src得到可读流  gulp.src得到的是一个对象流
        .pipe(gulp.dest('./build/'));
});
//执行 gulp copy

//4、gulp.watch()  监控任务
//type: added  deleted(删除文件)  changed(修改文件)  新增监控不了
gulp.task('watch',function () {
    gulp.watch('./app/*.html',function (event) {//监控的时候，输出当前事件
        console.log(event);
    });
});
/*gulp.task('log',function () {
 console.log('log');
 });
 gulp.task('watch',function () {
 gulp.watch('./app/!*.html',['copy','log']);//可以在监控时候再执行其他任务
 });*/
