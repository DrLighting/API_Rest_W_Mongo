const express = require('express')
const router = express.Router()
const vendaClasse = require('../classes/vendas')
const {validaAcesso} = require('../classes/auth')
const { route } = require('./rotas_estoque')

const vendas = new vendaClasse()

router.post('/criar', validaAcesso, async(req,res)=>{
    const {data,cliente,prod} = req.body
    const venda =  new vendaClasse(data,cliente,prod)
    const result = await vendas.CriarVenda(venda)
    if(result){
        res.status(200).json({msg: 'true'})
    }else{
        res.status(400).json({msg: 'false'})
    }
})

router.post('/excluir', validaAcesso, async(req,res)=>{
    const id = req.body
    const result = await vendas.ExcluirVenda(id)
    if(result){
        res.status(200).json({msg: 'true'})
    }else{
        res.status(400).json({msg: 'false'})
    }
})

router.get('/buscar/cliente/:nome', validaAcesso, async(req,res)=>{
    const nome = req.params.nome
    const result = await vendas.BuscarVendaCliente(nome)
    if(result != []){
        res.status(200).json({msg: 'true', result: result})
    }else{
        res.status(400).json({msg: "false"})
    }
})

router.post('/buscar/data/', validaAcesso , async(req,res)=>{
    const data = req.body.data
    const result = await vendas.BuscarVendaData(data)
    if(result != []){
        res.status(200).json({msg: 'true', resultado: result})
    }else{
        res.status(400).json({msg: 'false'})
    }
})

module.exports = router