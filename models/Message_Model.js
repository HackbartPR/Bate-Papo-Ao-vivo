//CLASSE RESPONSÁVEL POR GERENCIAR TODOS AS MENSAGENS TROCADAS ENTRE O BACK E O FRONT
class Messages {
    //RESPONSÁVEL POR CRIAR UM ARRAY DE OBJETOS (MENSAGENS)
    constructor() {
      this.conversa = []
    }
  
    //LISTAR TODAS AS MENSAGENS
    list() {
      return [...this.conversa]
    }
  
    //ADICIONAR UMA NOVA MENSAGEM NO ARRAY DE MENSAGENS
    add(objMessage) {
      return this.conversa.push(objMessage)
    }
  }
  
  module.exports = Messages