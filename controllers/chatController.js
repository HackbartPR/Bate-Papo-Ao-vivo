const { Module } = require('module')
const socketIO = require('socket.io')
const Message_Model = require('../models/Message_Model')

//SALVA TODAS AS MENSAGENS NO BANCO DE DADOS
async function saveMessage(data){
  //CRIA UMA MENSAGEM DE ACORDO COM O MODELO DE MENSAGENS DO MONGOOSE
  const newMessage = new Message_Model({
    user: data.user,
    message: data.message
  })

  try {
    //SALVA NO BANCO DE DADOS A MENSAGEM RECEBIDA
    await newMessage.save()
  } catch (error) {
    return error
  }  
}

//ENVIA PARA O SOCKET DO FRONT-END A MENSAGEM SALVA NO BANCO DE DADOS
function newMessage(io, data) {
  //SALVA TODAS AS MENSAGENS RECEBIDAS DO EVENTO NEW_MESSAGE
  saveMessage(data)
  //ENVIA PARA TODAS AS CONEXÕES TODAS AS MENSAGENS INSERIDAS
  /* io.emit('updateMessage', updateMessage(data)) */
}

//TODA VEZ QUE O EVENT LISTENER PERCEBER ALGUM EVENTO DE CONNECTION, ACIONARÁ ESTA FUNÇÃO
function onConnection(io, socket) {
  //TODO EVENTO COM IDENTIFICAÇÃO DE NEWMESSAGE SERÁ ENVIADO PARA FUNÇÃO NEWMESSAGE
  socket.on('newMessage', (data) => {newMessage(io, data)})
  console.log('Servidor Socket ON')
}

module.exports = (server) => {
  //CONNECTA O MÓDULO AO SERVIDOR
  const io = socketIO(server)

  //TODA VEZ QUE O EVENT LISTENER PERCEBER ALGUM EVENTO DE CONNECTION, ACIONARÁ ESTA FUNÇÃO
  io.on('connection', (socket) => {
    onConnection(io, socket)
    socketGlobal = socket
  })
}
