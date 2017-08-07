var gulp=require('gulp');
var less=require('gulp-less');//是个less的插件
gulp.task('css',function () {
    gulp.src('./app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./build/css'));
});

//less发生改变的时候，编译less
gulp.task('watch',function () {
    gulp.watch('./app/less/*.less',function (event) {
        gulp.src('./app/less/*.less')
            .pipe(less())
            .pipe(gulp.dest('./build/css'));
    })
});
