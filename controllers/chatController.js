const socketIO = require('socket.io')
const Message_Model = require('../models/Message_Model')

//CRIA UMA INSTÂNCIA COM A CLASSE MODELO DE MENSAGEM
const messagesSaved = new Message_Model()

//ENVIA PARA O SOCKET DO FRONT-END A MENSAGEM SALVA NO BANCO DE DADOS
function newMessage(io, data) {
  //SALVAR A MENSAGEM RECEBIDA  
  messagesSaved.add(data)
  //ENVIA PARA TODAS AS CONEXÕES TODAS AS MENSAGENS INSERIDAS
  io.emit('updateMessage', messagesSaved.list())
}

//RECEBE A MENSAGEM DE UM NOVO USUARIO LOGADO
function onNewUserLoged(io, user){  
  //SALVAR O USUARIO RECEBIDO
  messagesSaved.addUser(user)
  //ENVIA O NOME DO NOVO USARIO LOGADO
  io.emit('updateNewUser', messagesSaved.listUser())
  //ENVIA PARA TODAS AS CONEXÕES TODAS AS MENSAGENS INSERIDAS
  io.emit('updateMessage', messagesSaved.list())
}

//TODA VEZ QUE O EVENT LISTENER PERCEBER ALGUM EVENTO DE CONNECTION, ACIONARÁ ESTA FUNÇÃO
function onConnection(io, socket) {
  //TODO EVENTO COM IDENTIFICAÇÃO DE NEWMESSAGE SERÁ ENVIADO PARA FUNÇÃO NEWMESSAGE
  socket.on('newMessage', (data) => {newMessage(io, data)})

  socket.on('newUserLoged', (user)=>{onNewUserLoged(io, user)})
  
}

module.exports = (server) => {
  //CONNECTA O MÓDULO AO SERVIDOR
  const io = socketIO(server)

  //TODA VEZ QUE O EVENT LISTENER PERCEBER ALGUM EVENTO DE CONNECTION, ACIONARÁ ESTA FUNÇÃO
  io.on('connection', (socket) => {
    onConnection(io, socket)
  })
}

