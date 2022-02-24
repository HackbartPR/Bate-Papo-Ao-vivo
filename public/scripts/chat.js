document.addEventListener('DOMContentLoaded', async ()=>{
    managerCookies()
})

//FUNÇÃO RESPONSÁVEL POR OBTER SALVAR E EXCLUIR OS COOKIES
function managerCookies(){ 
    //RECEBE TODOS OS COOKIES EXISTENTES
    let arrayCookie = document.cookie.split(';')
    //SALVA OS COOKIES NO LOCALSTORAGE
    localStorage.setItem(arrayCookie[0].replace('id=',''))
    localStorage.setItem(arrayCookie[1].replace('name=',''))
    localStorage.setItem(arrayCookie[2].replace('token=',''))
    //REMOVE TODOS OS COOKIES
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'id' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'name' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

