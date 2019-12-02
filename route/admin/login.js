// 引入加密模块
// const bcrypt = require('bcrypt')

// 导入数据集合构造函数
const { User } = require('../../model/user')

// 导入加密
const hash = require('../../utils/hash')

module.exports = async (req, res) => {
    const { email, password } = req.body
    // 服务端效验
    if (email.trim().length == 0 || password.trim().length == 0) {
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
    }
    let user = await User.findOne({ email })
    if (user) {
        // let isValid = await bcrypt.compare(password, user.password)
        // 判断得到的密码和数据库的密码是否相等
        if (hash(password) == user.password) {
            // 挂几个值
            req.session.username = user.username
            req.app.locals.userInfo = user
            req.session.role = user.role
            if (user.role == 'admin') {
                res.redirect('/admin/user')
            } else {
                res.redirect('/home/')
            }

        } else {
            res.status(400).render('admin/error', {
                msg: '邮件地址或者密码错误'
            })
        }
    } else {
        res.status(400).render('admin/error', {
            msg: '邮件地址或者密码错误'
        })
    }
}