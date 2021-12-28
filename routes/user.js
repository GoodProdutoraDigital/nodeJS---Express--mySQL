const passport = require('passport')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home/login')
})

//autenticação passport
router.post('/login', (req, res, next) => {
    passport.authenticate('local', 
    {
        successRedirect: '/',
        failureRedirect: '/user',
        failureFlash: true
    
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Desconectado')
    res.redirect('/')
})

module.exports = router