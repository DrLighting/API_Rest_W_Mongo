const express = require('express')
const router = express.Router()
const estoqueClasse = require('../classes/estoque')
const {validaAcesso} = require('../classes/auth')

const estoques = new estoqueClasse()

router.post('/criar', validaAcesso, async(req,res)=>{
    const {nome,preco,quant} = req.body
    const produto =  new estoqueClasse(nome,preco,quant)
    const result = await estoques.CriarEstoque(produto)
    if(result){
        res.status(200).json({msg: 'true'})
    }else{
        res.status(400).json({msg: 'false'})
    }
})

router.post('/excluir', validaAcesso, async(req,res)=>{
    const id = req.body
    const result = await estoques.ExcluirProduto(id)
    if(result){
        res.status(200).json({msg: 'true'})
    }else{
        res.status(400).json({msg: 'false'})
    }
})

router.get('/buscar/:nome', validaAcesso, async(req,res)=>{
    const nome = req.params.nome
    const result = await estoques.BuscasProduto(nome)
    if(result != []){
        res.status(200).json({msg: true, result: result})
    }else{
        res.status(400).json({mdg: "false"})
    }
})



module.exports = router