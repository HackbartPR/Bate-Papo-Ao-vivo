const securityController = require('../controllers/securityControler')
const loginController = require('../controllers/loginController')
const express = require('express')
const router = express.Router()

const path = 'C:/Users/pc/Documents/Programação/Bate Papo Ao vivo/public/chat.html'

//PÁGINA INICIAL APÓS REALIZAR O LOGIN
router.post('/', express.json(), express.urlencoded({extended: true}), loginController.loginUser ,securityController.Authorization_Token, (req,res)=>{res.sendFile(path)})

//FUNÇÃO PROVISÓRIA, DEVE SER EXCLUIDA
router.use('/', express.static('public/chat.html'))
module.exports = router
