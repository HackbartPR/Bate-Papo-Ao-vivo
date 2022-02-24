//INSTANCIANDO O SOCKET DO SERVIDOR IO, ESTE QUE ESTÁ CONECTADO NO LOCALHOST
const socket = io(`http://192.168.1.117:3000`)

//VARIÁVEL RECEBERÁ O USÁRIO LOCAL
var localUser = {}

//EVENTO DE CARREGAR JAVASCRIPT APÓS TODO HTML ESTAR PRONTO
document.addEventListener('DOMContentLoaded', ()=>{
    //CONFIGURA TODA A COMUNICAÇÃO DE COOKIES
    managerCookies()
    
    //SALVA E ATUALIZA O NOVO USUARIO LOGADO
    newUserLoged()

    //ATRIBUI A FUNÇÃO DE ENVIAR MENSAGEM PARA A INPUT SEND
    document.getElementById('divChatWriteSend').addEventListener('click', emitMessage)
})

//ATUALIZA OS CONTATOS ONLINE
function newUserLoged(){
    //RECEBE O NOME DO USUARIO LOGADO
    let user = localUser.userName
    //ENVIA O NOME DO USUARIO LOGADO PARA O SERVIDOR
    socket.emit('newUserLoged', user)
}

//EVENTO DE RECEBER USUARIOS LOGADOS NO SERVIDOR
socket.on('updateNewUser', (arrayUser)=>{
    //CRIA INSTÂNCIA DA DIV PRINCIPAL DOS CONTATOS
    let divContacts = document.getElementById('divContacts')

    //REMOVENDO TODOS AS MENSAGENS ANTERIORES E ATUALIZANDO
    while(divContacts.hasChildNodes()){divContacts.removeChild(divContacts.firstChild)}

    //PERCORRE TODOS OS USUARIOS LOGADOS
    arrayUser.forEach(user=>{
        //CRIA A DIV CONTAINER DO USUARIO
        let divUser = document.createElement('div')
        divUser.setAttribute('class', 'user')

        //CRIA A DIV QUE RECEBERÁ A FOTO DO USUARIO
        let userImage = document.createElement('div')
        userImage.setAttribute('class', 'userImage')

        //CRIA A DIV QUE RECEBERÁ O NOME DO USUARIO
        let userName = document.createElement('div')
        userName.setAttribute('class', 'userName')

        //ADICIONA AS DIVS DENTRO DA DIV CONTAINER DO USUARIO
        divUser.appendChild(userImage)
        divUser.appendChild(userName)

        //ENQUANTO O NOME TIVER O CARACTERE ESPECIAL, O MESMO SERÁ SUBSTITUIDO POR ESPAÇO
        while(user.match(/%20/)){user = user.replace("%20", " ")}
        
        //ADICIONA O NOME DO USUARIO NA DIV
        userName.innerText =  user

        //ADICIONA A DIV CONTAINER DENTRO DA DIV PRINCIPAL DO USUARIO
        divContacts.appendChild(divUser)
    })
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
        let divMessageText = document.createElement('div')
        let divMessageInfo = document.createElement('div')
        let divMessage = document.createElement('div')

        //VERIFICA QUEM ENVIOU A MENSAGEM E MUDA AS CARACTERISTICAS DAS DIVS
        if(message.user == localUser.userName){
            divMessageText.setAttribute('class', 'divChatMyMessageText')
            divMessageInfo.setAttribute('class', 'messageMyInfo')
            divMessage.setAttribute('class', 'myMessage')
        }else{
            divMessageText.setAttribute('class', 'divChatMessageText')
            divMessageInfo.setAttribute('class', 'messageInfo')
            divMessage.setAttribute('class', 'message')
        }  

        //ATRIBUI OS TEXTOS PARA AS DIVS
        divMessageInfo.innerText = message.user
        divMessage.innerText = message.message

        //ADICIONA AS DIVS DENTRO DAS OUTRAS
        divMessageText.appendChild(divMessageInfo)
        divMessageText.appendChild(divMessage)
        divMessages.appendChild(divMessageText)
    })
})

//FUNÇÃO RESPONSÁVEL POR ENVIAR MENSAGEM PARA O SERVIDOR
function emitMessage(){
    //RECOLHE OS DADOS INSERIDOS NECESSÁRIOS PARA SALVAR UMA MENSAGEM
    let message = document.getElementById('inputWrite').value
    let user = localUser.userName
    
    //EMITE A MENSAGEM PARA O SERVIDOR
    socket.emit('newMessage', {user, message})

    //LIMPANDO A INPUT DE DIGITAÇÃO DE TEXTOS
    document.getElementById('inputWrite').value = ''
}
 
//FUNÇÃO RESPONSÁVEL POR OBTER SALVAR E EXCLUIR OS COOKIES
function managerCookies(){ 
    //CRIA UM ARRAY SEPARANDO A STRING PELO CARACTERE DE SEPARAÇÃO DO COOKIE ';'
    let arrayCookie = document.cookie.split(';')
    //PERCORRE TODOS OS COOKIES 
    for(let i = 0; i < arrayCookie.length; i++){
        //CRIA OUTRA STRING SEPARANDO O NOME DO VALOR USANDO O CARACTERE '='
        let name = arrayCookie[i].split('=')[0]
        let value = arrayCookie[i].split('=')[1]
        //SALVA NO LOCAL STORAGE TODAS AS INFORMAÇÕES NECESSARIAS DO USUARIO
        localStorage.setItem(name, value)
    }

    //REMOVE TODOS OS COOKIES
    document.cookie = 'userToken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'userId' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'userName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = ' userToken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = ' userId' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = ' userName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    
    //INSERI O NOME DO USUARIO LOCAL
    localUser = {
        id: localStorage.getItem(' userId'),
        token: localStorage.getItem('userToken'),
        userName: localStorage.getItem(' userName')
    } 
}