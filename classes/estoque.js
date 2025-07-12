const db = require('../arquivos/db.js')
const logs = require('../arquivos/errorsLog.js')

class estoque {
    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    /*metodos*/

    //validação + logs 

    async validardados(produto) {

        const regexValida = /^\d+(,\d{2})?$/

        if (produto.nome == null || produto.nome == '') {
            console.log("O campo nome não pode estar vazio")
            await logs.escreveJson("Cadastramento de produto com nome vazio")
            return false
        }
        if (produto.preco == null || produto.preco == '') {
            console.log("O valor do produto não pode ser nulo")
            await logs.escreveJson("Cadastramento de produto com valor vazio")
            return false
        }
        if (produto.quantidade == null || produto.quantidade == '') {
            console.log("A quantidade do produto não pode esta vazia")
            await logs.escreveJson("Cadastramento de produto com quantidade vazio")
            return false
        }
        if(regexValida.test(produto.preco) == false){
            console.log("O valor do produto deve ter o formato correto")
            await logs.escreveJson("Cadastramento de produto com valor invalido")
            return false
        }

        return true
    }

    //criar

    async CriarEstoque(produto) {
        if (await this.validardados(produto)) {
            const result = await db.criarProduto(produto)
            if (result) {
                console.log("Produto criado com sucesso")
                return true
            } else {
                console.log("Erro ao cadastrar produto")
                await logs.escreveJson("Erro ao cadastrar produto")
                return false
            }
        }
    }

    //excluir

    async ExcluirProduto(id) {
        if (id == '') {
            console.log("Campo ID vazio ao tentar excluir")
            await logs.escreveJson("Exclusão com o ID vazio")
            return false
        }

        const result = await db.excluirProduto(id)
        if (result.acknowledged && result.deletedCount == 1) {
            console.log("Produto excluida com sucesso")
            return true
        } else {
            if (result.deletedCount == 0) {
                console.log("Não foi achado nenhuma produto com o ID inseridos")
                return true
            } else {
                console.log("Erro ao excluir produto")
                await logs.escreveJson("Erro ao excluir produto")
                return false
            }
        }
    }

    //buscar nome

    async BuscasProduto(nome) {
        if (nome == '') {
            await logs.escreveJson("Buscar produto com nome vazio")
            return false
        }
        const result = await db.buscarProduto(nome)
        return result
    }
}

module.exports = estoque

/* test field */
