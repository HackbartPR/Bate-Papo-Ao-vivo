const mongoose = require('mongoose')

//CRIANDO UM LAYOUT DAS MENSAGENS A SEREM SALVAS NO BANCO DE DADOS
const messageSchema = new mongoose.Schema({
    user: {type: String, required:true},
    message: {type: String, required: true},
    sentAt: {type: Date, default:Date.now}
})

//CRIANDO UM MODELO DE MENSAGENS A SEREM SALVAS
const Message_Model = mongoose.model('Message', messageSchema )

module.exports = Message_Model