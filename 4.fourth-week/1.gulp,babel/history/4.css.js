var gulp=require('gulp');
var $=require('gulp-load-plugins')();

/*处理css
* 1、把less编译成css
* 2、把多个css文件合并成同一个
* 3、保存压缩前的合并文件
* 4、进行压缩
* 5、对压缩后的文件进行重命名
* 6、再保存一次
* */
gulp.task('css',function () {
    gulp.src('./app/less/*.less')
        .pipe($.less())//把less编译成css
        .pipe($.concat('all.css'))//把多个css文件合并成同一个
        .pipe(gulp.dest('./build/css'))//保存压缩前的合并文件
        .pipe($.cleanCss())//进行压缩
        // .pipe($.rename('all.min.css'))//对压缩后的文件进行重命名
        .pipe($.rename(function (file) {
            // console.log(arguments);//{ '0': { dirname: '.', basename: 'all', extname: '.css' } }
            file.basename+='.min';
        }))
        .pipe(gulp.dest('./build/css'));//再保存一次
});
