var gulp=require('gulp');
var $=require('gulp-load-plugins')();

/*处理css
* 1、获取app下面的所有html
* 2、对html压缩
* 3、保存压缩后的html
* *号只能匹配任意字符，不能匹配路径分隔符
* */
gulp.task('html',function () {
    // gulp.src(['./app/*.html','./app/base/*.html'])
    gulp.src('./app/**/*.html')//可以匹配任意字符，包括路径分隔符
        .pipe($.minifyHtml())
        .pipe(gulp.dest('./build'));
});
