const securityController = require('../controllers/securityControler')
const loginController = require('../controllers/loginController')
const express = require('express')
const router = express.Router()

const path = 'D:/Programação/Bate Papo Ao vivo/Bate-Papo-Ao-vivo/public/chat.html'

//PÁGINA INICIAL APÓS REALIZAR O LOGIN
router.post('/', express.json(), express.urlencoded({extended: true}), loginController.loginUser ,securityController.Authorization_Token, (req,res)=>{res.sendFile(path)})

module.exports = router

