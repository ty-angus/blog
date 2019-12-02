const express = require('express')

// 创建路由对象
const admin = express.Router()

admin.get('/login',require('./admin/loginPage'))

admin.post('/login', require('./admin/login'))

// 用户界面
admin.get('/user', require('./admin/userPage'))

admin.get('/logout',require('./admin/logout'))

// 新增用户界面
admin.get('/user-edit',require('./admin/user-edit'))

// 新增用户功能
admin.post('/user-edit',require('./admin/user-edit-fn'))

// 修改功能
admin.post('/user-modify', require('./admin/user-modify'))

// 删除功能路由
admin.get('/delete',require('./admin/user-delete'))

// 文章列表
admin.get('/article',require('./admin/article'))

// 编辑文章
admin.get('/article-edit',require('./admin/article-edit'))

// 添加文章
admin.post('/article-add',require('./admin/article-add'))

module.exports = admin