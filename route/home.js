const express = require('express')

const home = express.Router()

// 首页路由
home.get('/',require('./home/index'))

home.get('/article',require('./home/article'))

home.post('/comment',require('./home/comment'))

module.exports = home