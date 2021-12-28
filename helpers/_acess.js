module.exports = {
    admin: function(req, res, next){
        if(req.isAuthenticated() && req.user.isAdm == 1){
            return next()
        }
        req.flash('error_msg', 'Necessário nivel administrador')
        res.redirect('/')
    }
}