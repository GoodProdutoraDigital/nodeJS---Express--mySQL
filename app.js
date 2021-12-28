//carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')

//passport
const passport = require('passport')
require('./config/_auth')(passport)

//models
const seqModel = require('./models/seqModel')

//instanciando
const app = express()

//config's
app.use(session({
    secret: 'secretexpresssessionnodejs',
    resave: true,
    saveUninitialized: true
    //cookie: {maxAge: 3600}
}))
//definir passport
app.use(passport.initialize())
app.use(passport.session())
//definir flash
app.use(flash())
//definir msg middleware
app.use((req, res, next) => {
    //var global
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})
//body-parser
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
//definir template engine
const hand = handlebars.create({defaultLayout: 'main', runtimeOptions:{
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
}})
app.engine('handlebars', hand.engine)
app.set('view engine', 'handlebars')

//definir public
app.use(express.static(path.join(__dirname, 'public')))

//middleware
app.use((req, res, next) =>{
    console.log('executando middleware')
    next()
})

//definir home
app.get('/', (req, res) => {
    seqModel.insert.findAll({order: [['id', 'DESC']]}).then((select) => {
        res.render('home/index', {select: select})
    }).catch(() => {
        res.flash('error_msg', 'Erro ao listar usuários')
    })
})

//definir 404
app.get('/404', (req, res) => {
    res.render('home/404')
})

//definir conjunto de rotas
const admin = require('./routes/admin')
const user = require('./routes/user')
app.use('/admin', admin)
app.use('/user', user)

//config listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
 console.log('executando servidor em http://localhost:' + PORT)
})