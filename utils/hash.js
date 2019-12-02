const crypto = require('crypto')

module.exports = (con) => {
    // 加密方式
    const hmac = crypto.createHmac('sha256', 'secret-key')
    hmac.update(con)
    return hmac.digest('hex')
}