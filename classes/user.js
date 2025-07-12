const db = require('../arquivos/db.js')
const logs = require('../arquivos/errorsLog.js')
const jwt =  require('jsonwebtoken')

class user {
    constructor(login,senha){
        this.login = login        
        this.senha = senha
    }

    //metodos

    async validar(user){
        if(user.login == '' || user.login == null){
            await logs.escreveJson("Cadastramento de usuario com login vazio")
            return false
        }
        if(user.senha == '' || user.senha == null){
            await logs.escreveJson("Cadastramento de usuario com senha vazia")
            return false
        }

        return true

    }

    async CriarUser(login,senha){
        const users = new user(login,senha)
        if(await this.validar(users)){
            const result = await db.criarUsers(users)
            if(result){
                return true
            }else{
                await logs.escreveJson("Erro na ao tentar cadastrar usuario")
                return false
            }
        }
        
    }

    async Logar(login,senha){
        const users = new user(login,senha)
        const usuario = await db.buscarUser(users)
        if(usuario != ''){
            return jwt.sign({users: users}, 'UFind', {expiresIn: '30 min'} )
        }
        return false


    }

}


module.exports = user

