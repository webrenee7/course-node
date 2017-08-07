var gulp=require('gulp');
var $=require('gulp-load-plugins')();

gulp.task('html',function () {
    //要插入的目标文件流
    var target=gulp.src('./app/index.html');
    //将要被插入的资源
    var source=gulp.src(['./build/css/all.min.css','./build/js/all.min.js']);
    target
        .pipe($.inject(source,{ignorePath:'build',addRootSlash:false}))
        //ignorePath  插入时忽略路径
        //addRootSlash  路径顶部不加"/"
        .pipe(gulp.dest('./build'))
});