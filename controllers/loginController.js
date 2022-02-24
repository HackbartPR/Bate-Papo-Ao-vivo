require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User_Model = require('../models/User_Model')
const securityController = require('./securityControler')


//FUNÇÃO UTILIZADA PARA SALVAR UM NOVO USUÁRIO NO BANCO DE DADOS
async function createNewUser(req,res){
    try{
        //VERIFICAR SE TODOS OS CAMPOS FORAM PREENCHIDOS CORRETAMENTE
        let {error} = securityController.checkFilledFilds(req.body)
        if(error) return res.status(400).send(`Os campos não foram preechidos corretamente: ${error.message}`)

        //VERIFICAR SE O EMAIL JÁ SE ENCONTRA CADASTRADO
        let userFound = await User_Model.findOne({email: req.body.email })
        if(userFound) return res.status(400).send('Email já cadastrado!')

        const newUser = new User_Model({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            admin: securityController.registerAdmin(req.body.email)
        })

        //SALVANDO O NOVO USUARIO NO BANCO DE DADOS
        await newUser.save()

        //RESPOSTA DO SERVIDOR
        res.status(200).redirect("/")
    }
    catch(error){
        res.status(400).send(error.message)
    }
}

//REALIZAR O LOGIN DE UM USUARIO
async function loginUser(req,res, next){
    try {
        //VERIFICAR SE O EMAIL ESTÁ CADASTRADO
        let userLoged = await User_Model.findOne({email: req.body.email})
        if(!userLoged) return res.status(401).send(`Email ou senha incorreto!`)

        //VERIFICAR SE A SENHA É COMPATÍVEL COM O EMAIL
        let passwordMatch = bcrypt.compareSync(req.body.password, userLoged.password)
        if(!passwordMatch) return res.status(401).send('Email ou senha incorreto!')

        //REALIZA A CRIAÇÃO DE UM TOKEN DE ACESSO
        let token = jwt.sign({_id: userLoged._id, admin: userLoged.admin}, process.env.TOKEN_KEY_SECRET)

        //OBJETO A SER ENVIADO PARA MIDLEWARE SECURITY CONTROLLER
        req.body.token = token

        //ENVIA OS DADOS DO USUARIO PELOS COOKIES
        res.cookie('token', token)
        res.cookie('id', userLoged._id)
        res.cookie('name', userLoged.name)

        //VAI PARA O PRÓXIMO MIDLEWARE
        next()

    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = { createNewUser, loginUser}