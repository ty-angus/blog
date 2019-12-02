module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function () {
        res.clearCookie('connect.sid')
        // 重定向
        res.redirect('/admin/login')
    })
}