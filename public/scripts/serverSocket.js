 //INSTANCIANDO O SOCKET DO SERVIDOR IO, ESTE QUE ESTÁ CONECTADO NO LOCALHOST
const socket = io(`http://192.168.1.117:3000`)

function sendMessage(){
    socket.emit('newMessage', {user: 'Carlos', message:'Teste'})
}

document.addEventListener('DOMContentLoaded',()=>{
    sendMessage()
})

