const hapiJoi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

//VERIFICAR SE O EMAIL DIGITADO É DE UM ADMINISTRADOR
function registerAdmin(email) {
  let admin = false
  switch (email) {
    case 'cgharckbart@gmail.com':
      admin = true
      break
    case 'guil_fla@hotmail.com':
      admin = true
      break
    default:
      admin = false
  }

  return admin
}

//VERIFICAR SE TODOS OS CAMPOS FORAM PREENCHIDOS CORRETAMENTE
function checkFilledFilds(data) {
  const schema = new hapiJoi.object({
    name: hapiJoi.string().required().min(3).max(100),
    email: hapiJoi.string().required().min(3).max(100),
    password: hapiJoi.string().required().min(6).max(100),
  })

  return schema.validate(data)
}

//REALIZAR A VERIFICAÇÃO DO TOKEN ENVIADO PELO FRONT
function Authorization_Token(req,res,next){

  //RECEBER O TOEN ATRAVÉS DO HEADER
  const token = req.body.token

  //VERIFICA SE EXISTE ALGUM TOKEN
  if(!token){return res.status(401).send('Acesso Negado')}

  try {
    //RETORNA UM ERRO CASO O TOKEN SEJA DIFERENTE
    let userChecked = jwt.verify(token, process.env.TOKEN_KEY_SECRET)

    //VERIFICA SE POSSUI ERRO
    if(!userChecked){return res.status(401).send(userChecked)}

    //SEGUE PARA O PRÓXIMO MIDLEWARE
    next()

  } catch (error) {
    res.send('Erro: ' + error.message).status(401)
  }
 
}

module.exports = { registerAdmin, checkFilledFilds, Authorization_Token }
