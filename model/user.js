const mongoose = require('mongoose')

// const bcrypt = require('bcrypt')

const hash = require('../utils/hash')

const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 8
    },
    email: {
        type: String,
        // 保证邮箱在插入数据中时不会重复
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    statu: {
        type: Number,
        default: 0
    }

})

const User = mongoose.model('User', userSchema)

async function createUser() {
    // const salt = await bcrypt.genSalt(10)
    // const pass = await bcrypt.hash('123456',salt)
    await User.create({
        username: 'angus',
        email: 'angus@qq.com',
        password: hash('123456'),
        role: 'admin',
        state: 0
    })

}
// createUser()

// 验证的规则
const validateUser = con => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(con, schema);
}

module.exports = {
    User,
    validateUser
}