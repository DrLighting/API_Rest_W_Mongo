const { ObjectId } = require('mongodb')

const MongoClient = require('mongodb').MongoClient

let conexao

async function connect() {
    if(conexao){
        return conexao
    }

    const clinete = new MongoClient('mongodb://127.0.0.1:27017/')
    await clinete.connect()

    conexao = clinete.db('test')
    return conexao
}


module.exports = {
    /* compras */
    async CriarCompras(Compras) {
        const db = await connect()
        const result = await db.collection('compras').insertOne(Compras)
        return result.acknowledged
    },

    async BuscaCompraData(datas){
        const db = await connect()
        return await db.collection('compras').find({"data": datas}).toArray()
        
    },

    async BuscaFornecedor(fornecedor){
        const db = await connect()
        return await db.collection('compras').find({"fornecedor": fornecedor}).toArray()
        
    },

    async deletarCompra(id){
        const db = await connect()
        return await db.collection('compras').deleteOne({_id: new ObjectId(id)})
        
    },

    /* estoque */

    async criarProduto(produto){
        const db = await connect()
        const result = await db.collection('estoque').insertOne(produto)
        return result.acknowledged
    },

    async buscarProduto(nome){
        const db = await connect()
        return await db.collection('estoque').find({nome: nome}).toArray()
        
    },

    async excluirProduto(id){
        const db = await connect()
        return await db.collection('estoque').deleteOne({_id: new ObjectId(id)})
        
    },

    /*  vendas  */

    async criarVendas(venda){
        const db = await connect()
        const result = await db.collection('vendas').insertOne(venda)
        return result.acknowledged 
    },

    async buscarVendaData(data){
        const db = await connect()
        return await db.collection('vendas').find({data:data}).toArray()
        
    },

    async buscarVendaCliente(cliente){
        const db = await connect()
        return await db.collection('vendas').find({cliente:cliente}).toArray()
        
    },

    async excluirvenda(id){
        const db = await connect()
        return await db.collection('vendas').deleteOne({_id: new ObjectId(id)})
    },


    //users

    async criarUsers(user){
        const db = await connect()
        const result = await db.collection('users').insertOne(user)
        return result.acknowledged
    },

    async buscarUser(user){
        const db = await connect()
        const result = await db.collection('users').find({login: user.login, senha: user.senha}).toArray()
        return result
    }


}



