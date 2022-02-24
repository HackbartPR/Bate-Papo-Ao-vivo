const loginController = require('../controllers/loginController')
const express = require('express')
const router = express.Router()

//ROTA USADA PARA REALIZAR O LOGIN
router.post('/',  express.json(), express.urlencoded({extended: true}),loginController.loginUser) 

//ROTA USADA PARA A CRIAÇÃO DE UM NOVO USUARIO
router.post('/register', express.json(), express.urlencoded({extended: true}) ,loginController.createNewUser)


module.exports = router