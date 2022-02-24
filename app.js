require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const loginRouter = require('./routes/loginRouter')
const indexRouter = require('./routes/indexRouter')
const socketIO = require('./controllers/chatController')
const express = require('express')
const app = express()

//CONFIGURAÇÃO DO CORS
const corsOpt = {origin: `http://localhost:${process.env.PORT}`}
app.use(cors(corsOpt))

//CONEXÃO COM O BANCO DE DADOS
mongoose.connect(process.env.MONGOOSE_URL_CONNECTION).catch(error=>{
    console.log(`Erro na conexão com o banco de dados! ${error.message}`)
})
//CONFIGURANDO EVENTOS DO BANCO DE DADOS
const db = mongoose.connection
db.on('error', error=>{console.log(`Erro na conexão com o banco de dados! ${error.message}`)})
db.once('open', ()=>{console.log('Banco de dados conectado!')})

//CONFIGURANDO UMA NOVA FUNÇÃO PARA SALVAR COOKIES
app.use(cookieParse())
//ROTA PARA REALIZAR O LOGIN
app.use('/login', loginRouter)
//ROTA PARA PÁGINA INDEX (DEPOIS DE ESTAR LOGADO)
app.use('/index', indexRouter)
//PÁGINA LOGIN DE ABERTURA 
app.use('/', express.static('public'))

//CONEXÃO COM O SERVIDOR
const server = app.listen(process.env.PORT, (error)=>{
    error != true ? console.log('Servidor On') : console.log(`Servidor não conectado: ${error.message}`)
})

socketIO(server)
