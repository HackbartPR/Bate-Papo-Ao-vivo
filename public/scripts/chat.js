//INSTANCIANDO O SOCKET DO SERVIDOR IO, ESTE QUE ESTÁ CONECTADO NO LOCALHOST
const socket = io(`http://192.168.1.117:3000`)

//VARIÁVEL RECEBERÁ O USÁRIO LOCAL
var localUser = {}

document.addEventListener('DOMContentLoaded', ()=>{
    managerCookies()
    document.getElementById('divChatWriteSend').addEventListener('click', emitMessage)
})

//EVENTO DE RECEBER MENSAGEM DO SERVIDOR
socket.on('updateMessage', (arrayData)=>{
    //RECEBER UMA INSTÂNCIA DA DIV DE MENSAGENS
    let divMessages = document.getElementById('divChatMessage')
    //REMOVENDO TODOS AS MENSAGENS ANTERIORES E ATUALIZANDO
    while(divMessages.hasChildNodes()){divMessages.removeChild(divMessages.firstChild)}
    //PERCORRE TODAS AS MENSAGENS
    arrayData.forEach(message=>{
        //CRIA UM OBJETO TIPO DIV
        let divMessage = document.createElement('div')
        //VERIFICA QUEM ENVIOU A MENSAGEM
        message.user == localUser.name ? divMessage.setAttribute('class', 'myMessage') : divMessage.setAttribute('class', 'message')
        divMessage.innerText = message.message
        divMessages.appendChild(divMessage)
    })
})

//FUNÇÃO RESPONSÁVEL POR ENVIAR MENSAGEM PARA O SERVIDOR
function emitMessage(){
    //RECOLHE OS DADOS INSERIDOS NECESSÁRIOS PARA SALVAR UMA MENSAGEM
    let message = document.getElementById('inputWrite').value
    let user = localStorage.getItem('userName')
    console.log(user)
    //EMITE A MENSAGEM PARA O SERVIDOR
    socket.emit('newMessage', {user, message})
}
 
//FUNÇÃO RESPONSÁVEL POR OBTER SALVAR E EXCLUIR OS COOKIES
function managerCookies(){ 
    //RECEBE TODOS OS COOKIES EXISTENTES
    let arrayCookie = document.cookie.split(';')
    //SALVA OS COOKIES NO LOCALSTORAGE
    localStorage.setItem('userId', arrayCookie[0].replace('id=',''))
    localStorage.setItem('userName',arrayCookie[1].replace('name=',''))
    localStorage.setItem('userToken',arrayCookie[2].replace('token=',''))
    //REMOVE TODOS OS COOKIES
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'id' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'name' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    //INSERI O NOME DO USUARIO LOCAL
    localUser = {
        id: localStorage.getItem('userId'),
        token: localStorage.getItem('userToken'),
        userName: localStorage.getItem('userName')
    }
}