'use strict'
const { PORT } = require('./src/config')
const { radio } = require('./src/server')
const { sequelize } = require('./src/models')

sequelize.sync().then(() => {
    radio(PORT)
}).catch(console.error)