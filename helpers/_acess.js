module.exports = {
    admin: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'Faça login para acessar')
        res.redirect('/')
    }
}