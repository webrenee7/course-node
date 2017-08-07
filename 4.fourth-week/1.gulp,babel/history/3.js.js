var gulp=require('gulp');
/*
var less=require('gulp-less');//编译less
var concat=require('gulp-concat');//合并文件
var uglify=require('gulp-uglify');//压缩js
var rename=require('gulp-rename');//重命名文件
以上模块不需要一个个引入，但是需要安装
*/
var $=require('gulp-load-plugins')();//加载所有的插件，注意：需要执行

gulp.task('js',function () {
    gulp.src('./app/js/*.js')
        .pipe($.concat('all.js'))//把多个文件合并成一个文件，并指定合并后的文件名
        .pipe(gulp.dest('./build/js'))//向硬盘保存一次
        .pipe($.uglify())//压缩
        .pipe($.rename('all.min.js'))//重命名
        .pipe(gulp.dest('./build/js'));//保存
});
