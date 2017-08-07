var express = require('express');
var path = require('path');//处理路径
var favicon = require('serve-favicon');//处理收藏夹图标，当浏览器访问/favicon.ico的时候，服务器负责把收藏夹图标返回
var logger = require('morgan');//写请求日志
var cookieParser = require('cookie-parser');//处理cookie数据
var bodyParser = require('body-parser');//处理请求体

var routes = require('./routes/route_app');

var app = express();//请求监听函数
var ejs = require('ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板的存放目录
app.set('view engine', 'ejs');//设置模板引擎
app.set('view engine', 'html');// app.set('view engine', 'ejs');

app.engine('.html', ejs.__express);//如果文件后缀是html，用ejs渲染



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//获得get请求，第一个参数是匹配内容，第二个参数是匹配成功后执行的回调函数
app.get('/vote/index', routes.index);  
app.get(/\/vote\/detail/, routes.detail);  
app.get('/vote/register', routes.register);  
app.get('/vote/search', routes.search); 
app.get('/vote/rule', routes.rule);

app.get('/vote/index/data', routes.index_data);
app.get(/\/vote\/index\/poll/, routes.index_poll);
app.get(/\/vote\/index\/search/, routes.index_search);
app.get(/\/vote\/all\/detail\/data/, routes.detail_data);

app.post(/\/vote\/register\/data/, routes.register_data);
app.post('/vote/index/info', routes.index_info);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
