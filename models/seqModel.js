const sql = require('../config/_db')

const insert = sql.sequelize.define('cpusers', {
    user: {
        type: sql.Sequelize.STRING
    },
    pass: {
        type: sql.Sequelize.STRING
    }
})

//remover em modo produção
/* insert.sync({ force: true }).then(() => {
    console.log('database : success ')
})
 */

module.exports = {
    insert
}