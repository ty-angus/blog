// 引入Express框架
const express = require('express')

// 引入path路径拼接
const path = require('path')

// 引用body-parser模块
const bodyParser = require('body-parser')

// 引用express-session模块
const session = require('express-session')

// 引入art-template模块
const artTemplate = require('art-template')

// 引入时间格式化模块
const dateFormat = require('dateformat')

// 导入morgan这个第三方模块
const morgan = require('morgan');

// 创建 服务器
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')))

// 配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// 配置模板引擎
app.engine('art', require('express-art-template'))

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'art')

// 配置时间格式化
artTemplate.defaults.imports.dateFormat = dateFormat

require('./model/connect')
require('./model/user')

// 获取系统环境变量 process.env返回值是对象 
if (process.env.NODE_ENV == 'development') {
	// 当前是开发环境
	console.log('当前是开发环境')
	// 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
	// app.use(morgan('dev'))
} else {
	// 当前是生产环境
	console.log('当前是生产环境')
}

// 引入前台相关路由
const home = require('./route/home')
// 引入后台相关路由
const admin = require('./route/admin')

// 拦截请求,判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

app.use('/home', home)

app.use('/admin', admin)

// 错误捕获
app.use((err, req, res, next) => {
    const errs = JSON.parse(err);
    let arr = []
    for(let attr in errs){
        if(attr != 'path'){
            arr.push(attr + '=' + errs[attr])
        }
    }
    return res.redirect(`${errs.path}?${arr.join('&')}`);
});

app.listen(80, () => {
    console.log('网址是:http://localhost')
})