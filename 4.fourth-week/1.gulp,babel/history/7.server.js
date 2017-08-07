var gulp=require('gulp');
var $=require('gulp-load-plugins')();
//gulp-connect

//启动http服务
gulp.task('serve',function () {
    $.connect.server({
        port:8080,
        root:'./build',
        livereload:true//启动自动刷新
    })
});
//将源文件拷贝到静态文件目录下
gulp.task('html',function () {
   gulp.src('./app/index.html')
       .pipe(gulp.dest('./build'))
       .pipe($.connect.reload());//通知浏览器自动刷新
});
//监控源文件的变化
gulp.task('watch',function () {
   gulp.watch('./app/index.html',['html']);
});
//组合任务  自己没有任务，但是把其他任务组合起来
gulp.task('default',['serve','watch']);//通过default执行server和watch
