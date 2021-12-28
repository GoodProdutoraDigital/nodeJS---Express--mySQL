const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local')

const seqModel = require('../models/seqModel')

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'user', passwordField: 'pass'},(user, pass, done) => {
        seqModel.insert.findOne({where: {user: user}}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: 'Usuário ou senha invalidos'})
            }
            if(usuario.pass === pass){
                return done(null, usuario)
            }else{
                return done(null, false, {message: 'Usuário ou senha invalidos'})
            }
        })
    }))

    //materializa a sessão do usuário.
    passport.serializeUser((usuario, done) => {
        return done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        seqModel.insert.findByPk(id).then((usuario) => {
            return done(null, usuario)
        })
        
    })
    

}