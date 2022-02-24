const mongoose = require('mongoose')

//LAYOUT DOS DADOS QUE DEVEM SER SALVOS NO BANCO DE DADOS
const userSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength: 3, maxlength: 100},
    email: {type:String, required:true, minlength: 3, maxlength: 100},
    password: {type:String, required:true, minlength: 6, maxlength: 100},
    admin: {type:Boolean, default: false},
    creatAt: {type: Date, default: Date.now}

})
//CRIAÇÃO DO MODELO DO USUARIO BASEADO NO LAYOUT ACIMA
const User_Model = mongoose.model('User', userSchema)

module.exports = User_Model

