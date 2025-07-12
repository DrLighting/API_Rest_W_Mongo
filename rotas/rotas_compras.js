const express = require('express')
const router = express.Router()
const compraClasse = require('../classes/compras.js')
const {validaAcesso} = require('../classes/auth')

const Compras = new compraClasse()


router.post("/criar", validaAcesso, async(req,res)=>{
    let{data,fornecedor,produto} = req.body
    const compra = new compraClasse(data,fornecedor,produto)
    const result = await Compras.CriarCompra(compra)
    if(result){
        res.status(200).json({msg: 'true'})
    }else{
        res.status(400).json({msg: 'false'})
    }
    
})

router.post("/excluir", validaAcesso, async(req,res)=>{
    let id = req.body
    const result = await Compras.deletarcompra(id)
    if(result){
        res.status(200).json({msg: 'true'})
    }else{
        res.status(400).json({msg: 'false'})
    }
})

router.get("/buscar/fornecedor/:nome", validaAcesso, async(req,res)=>{
    let fornecedor = req.params.nome
    const result = await Compras.buscarFornecedor(fornecedor)
    if(result != []){
        res.status(200).json({msg: 'true', resultado: result})
    }else{
        res.status(400).json({msg: 'false'})
    }
})

router.post("/buscar/data/", validaAcesso, async(req,res) =>{
    let data = req.body.data
    const result = await Compras.buscaData(data)
    if(result != []){
        res.status(200).json({msg: 'true', resultado: result})
    }else{
        res.status(400).json({msg: 'false'})
    }
})



module.exports = router