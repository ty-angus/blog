const { User } = require('../../model/user')
module.exports = async (req, res) => {
    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    

    let page = req.query.page || 1;
    let pagesize = 5 
    // 获取总的数据量
    let count = await User.countDocuments({})
    // 计算出总的页数
    let total = Math.ceil(count / pagesize)
    let start = (page - 1) * pagesize
    let users = await User.find().limit(pagesize).skip(start)

    // 渲染模块
    res.render('admin/user', {
        username: req.session.username,
        users: users,
        page:page,
        total:total
    })

   
}