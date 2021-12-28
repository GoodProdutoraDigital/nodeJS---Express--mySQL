const Sequelize = require('sequelize')
//configurar conexão database
const sequelize = new Sequelize('test', 'root', 'senha', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}