什么是gulp？
> gulp是可以自动化执行任务的工具，它是是node的一个模块。 在平时开发的流程里面,一定有一些任务需要手工重复得执行,只要你觉得有些动作是要重复去做的,就可以把这些动作创建成一个gulp任务,然后在特定的条件下自动执行. 比如在less源文件发生改变后自动编译成css文件

# 1. gulp的使用方式
## 1.1 全局安装gulp

```
npm install gulp -g  //-g 表示在全局范围内去安装.
```

## 1.2 本地安装gulp
```
npm install express --save  //项目依赖（项目需要，开发不需要）
npm install gulp --save-dev  //开发依赖（开发需要，上线不需要）
```

```
npm install --production  //上线时候，只安装项目依赖
```

# 2. 一些api
- gulp.task()  定义任务
```
gulp.task('hello',function () {
    console.log('hello');
});
```

- gulp.watch() 监控任务
```
gulp.task('watch',function () {
//gulp.watch()第二个参数可以是个数组，里面放监控时执行的任务
    gulp.watch('./app/*.html',function (event) {//监控的时候，输出当前事件，事件类型：added  deleted(删除文件)  changed(修改文件)  新增监控不了
        console.log(event);
    });
});
```

- pipe() 可读流导入到可写流
```
gulp.src('./app/index.html')//src得到可读流
.pipe(gulp.dest('./build/'));
```

# 3. gulp插件（9个）
- gulp-less  编译less
- gulp-concat  合并文件
- gulp-uglify  压缩js
- gulp-cleanCss  压缩css
- gulp-minifyHtml  压缩html
- gulp-rename 重命名文件
- gulp-connect  创建本地服务
- gulp-inject  注入文件
- gulp-babel  编译es6
- gulp-load-plugins  包括所有的gulp插件，引入时要执行

# 4.gulp下使用babel
## 4.1 安装babel
```
npm install babel-cli -g
```
默认什么都不干，需要安装插件

## 4.2 配置babel
Babel是一个通用编译器，因此默认情况下它反而什么都不做,你必须明确地告诉Babel应该要做什么 在项目根目录下创建.babelrc文件,这是用来让Babel做你要它做的事情的配置文件
当前目录下建一个配置文件.babelrc
```
{
  "presets":["es2015"]
}
```
##  4.3 使用预设
```
npm install babel-preset-es2015
```






