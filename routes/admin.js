const express = require('express')
const router = express.Router()
const seqModel = require('../models/seqModel')

const { admin } = require('../helpers/_acess')

router.get('/', admin, (req, res) => {
    res.render('admin/index')
})

router.get('/new', (req, res) => {
    res.render('admin/insert')
})

router.post('/new/user', (req, res) => {
    //validação
    var erros = []
    if(!req.body.login || typeof req.body.login == undefined || req.body.login == null){
        //push - inserir dados dentro de um array
        erros.push({texto: 'Login invalido'})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Senha invalida'})
    }
    if(erros.length >0){
        res.render('admin/index', {erros : erros})
    
    }else{
        
        const novoUser = {
            user: req.body.login,
            pass: req.body.senha,
            isAdm: 0 
        }
        seqModel.insert.create(novoUser).then(() => {
            req.flash('success_msg', 'Novo usuário criado com Sucesso !!')
            res.redirect('/admin/new')
        }).catch((error) => {
            req.flash('error_msg', 'Erro ao criar usuário')
            res.redirect('/admin')
        })
    }
})

router.get('/update/:id', (req, res) => {
    seqModel.insert.findOne({where: {'id': req.params.id}}).then((populate) => {
        res.render('admin/update', {populate: populate})
    }).catch(() => {
        res.render('admin/update')
    })    
})

router.post('/update/user/', (req, res) => {
    seqModel.insert.findOne({where: {'id': req.body.id}}).then((Update) => {
        
        Update.id = req.body.id,
        Update.user = req.body.login,
        Update.pass = req.body.senha

        const objectUpdate = {
            user: Update.user,
            pass: Update.pass
        }
        
        seqModel.insert.update(objectUpdate, {where: {'id': Update.id}}).then(() => {
            req.flash('success_msg', 'Dados atualizados')
            res.redirect('/')
        }).catch((erro) => {
            req.flash('error_msg', 'Erro ao atualizar')
            //res.redirect('/')
        })
        
    }).catch((erro) => {
        req.flash('erro_msg', 'Erro ao atualizar')
        res.redirect('/')
    })
})


router.get('/delete/:id', (req, res) => {
    seqModel.insert.destroy({where: {'id': req.params.id}}).then(() => {
        req.flash('success_msg', 'Deletado com sucesso')
        res.redirect('/')
    }).catch((erro) => {
        req.flash('error_msg', 'Erro ao deletar')
        res.redirect('/')
    })
})

    /* add.create(req.body).then((user) => {
        res.json(user)
    }) */

module.exports = router