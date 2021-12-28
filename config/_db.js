const Sequelize = require('sequelize')
//configurar conexão database
const sequelize = new Sequelize('test', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}