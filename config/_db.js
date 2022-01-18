const Sequelize = require('sequelize')
//configurar conexão database
const sequelize = new Sequelize('test', 'root', 'pass', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}