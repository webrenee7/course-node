

# 1. npm
什么是npm？
> 包管理工具，安装node后自带的

## 1.1 初始化包
```
npm init -y
```

## 1.2 安装包
### 1.2.1 项目依赖
```
npm install bootstrap angular --save
```

### 1.2.2 开发依赖
```
npm install gulp --save-dev或者-D
```

## 1.3 卸载包/删除包
```
npm uninstall bootstrap angular
```

## 1.4 安装指定版本
```
npm install jquery jquery#3.0.0 --save
```

## 1.5.显示版本号
```
npm info jquery
```

# 2. bower
管理前端框架的

文件夹不能大写，而且不能有中文 特殊符
## 2.1 安装bower
```
npm install bower -g
```

## 2.2 生成bower.json
```
bower init
```

## 2.3 安装模块
```
bower install jquery --save
bower install gulp --save-dev
```
默认安装到bower_components

## 2.4 安装所有bower文件
```
bower install
```

## 2.5 指定目录安装文件
```
touch .bowerrc
{"directory":"lib/js"}
```

# 3. 发布包
## 3.1 初始化package.json
```
npm init -y  //name不能存在过
```

## 3.2 使用npm的网
```
nrm use npm
```

## 3.3 注册账号，有账号表示登录
```
npm addUser
```

## 3.4 发布
```
npm publish
```
