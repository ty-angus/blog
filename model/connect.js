const mongoose = require('mongoose')

const config = require('config')

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('连接上了')
}).catch(error => {
    console.log(error)
})


