const logs = require('../arquivos/errorsLog.js')
const db = require('../arquivos/db.js')

class Compras {
    constructor(data, fornecedor, produtos) {
        this.data = data;
        this.fornecedor = fornecedor;
        this.produtos = produtos
    }

    /*metodos*/

    //validar dados
    async validarDados(compra) {

        const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;


        if (compra.data == null || compra.data == '') {
            console.log("A data encotra-se vazia")
            await logs.escreveJson("Cadastramento de compra com data vazio")
            return false
        }
        if (compra.fornecedor == null || compra.fornecedor == '') {
            console.log("O fornecedor encotra-se vazio")
            await logs.escreveJson("Cadastramento de compra com nome do fornecedor vazio")
            return false
        }
        if (compra.produtos == null || compra.produtos == '') {
            console.log("Não ha produtos na compra encotra-se vazia")
            await logs.escreveJson("Cadastramento de compra com produto vazio")
            return false
        }
        if(!regexData.test(compra.data)){
            console.log("Formato da data invalido")
            await logs.escreveJson("Cadastramento de compra com formato da data errad ou inavlida")
            return false
        }

        return true

    }

    //criar

    async CriarCompra(compra) {
        if (await this.validarDados(compra)) {
            const result = await db.CriarCompras(compra)
            if (result) {

                return true
            } else {
                await logs.escreveJson("Erro na ao tentar compra")
                return false
            }

        }

        return false
    }

    //excluir
    async deletarcompra(id) {
        if (id == '') {
            console.log("Campo ID vazio ao tentar excluir")
            await logs.escreveJson("Exclusão com data ou nome vazio")
            return false
        }
        const result = await db.deletarCompra(id)
        if (result.acknowledged && result.deletedCount == 1) {
            console.log("Compra excluida com sucesso")
            return true
        } else {
            if (result.deletedCount == 0) {
                console.log("Não foi achado nenhuma compra com os valores inseridos")
                return true
            } else {
                console.log("Erro ao excluir compra")
                await logs.escreveJson("Erro ao excluir compra")
                return false
            }
        }
    }

    //buscar data

    async buscaData(data) {
        if (data == '') {
            await logs.escreveJson("Busca compra com data vazio")
            return false
        }
        const result = await db.BuscaCompraData(data)
        if(result.length  == 0){
            console.log("Nenhuma Compra realizada na data inserida encontrado")
            console.log(result)
            return true
        }
        console.log(result)
        return result
    }

    //buscar fornecedor

    async buscarFornecedor(nome) {
        if (nome == '') {
            await logs.escreveJson("Busca fornecedor com nome vazio")
            return false
        }
        const result = await db.BuscaFornecedor(nome)
        return result
    }
}

module.exports = Compras

/* test field */



