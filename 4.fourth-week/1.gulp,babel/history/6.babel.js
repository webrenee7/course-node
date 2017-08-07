var gulp=require('gulp');
var $=require('gulp-load-plugins')();

gulp.task('js',function () {
    gulp.src('./app/js/es6.js')
        .pipe($.babel({"presets":["es2015"]}))
        .pipe($.rename('es5.js'))
        .pipe(gulp.dest('./build/js'));
});
