const { Article } = require('../../model/article')

// 导入数据分页第三方包,返回的是方法
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
    let page = req.query.page || 1
    // 添加标识,会根据点击之后的响应页面去改变这个值,模板中会判断这个值,来决定是显示或者隐藏
    req.app.locals.currentLink = 'article';

    let articles = await pagination(Article).find().page(page).size(2).display(2).populate('author').exec()
    // res.send(articles)
    res.render('admin/article', {
        articles: articles,
        username: req.session.username
    });
}