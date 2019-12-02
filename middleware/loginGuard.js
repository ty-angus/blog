module.exports = (req, res, next) => {
        // 不登录或者已经退出
        if (req.url !== '/login' && !req.session.username) {
            res.redirect('/admin/login')
        } else {
            // 登录上后如果是普通用户
            if(req.session.role == 'normal' && req.url !== '/login'){
                return res.redirect('/home/')
            }
            next()
        }
    }
