const express = require('express')
const router = express.Router() 
const userClasse = require('../classes/user.js')
const {validaAcesso} = require('../classes/auth.js')

const users = new userClasse()

router.post('/login', async(req, res) =>{
    let{login, senha} = req.body
    const tolken = await users.Logar(login,senha)
    if(tolken == ''){
        res.status(403).json({msg: "False"})
    }else{
        res.status(200).json({msg: 'True', tolken: tolken})
    }
})

router.post('/cadastro', async(req,res)=>{
    let{login,senha} = req.body
    const result = await users.CriarUser(login,senha)
    if(result){
        res.status(200).json({msg: 'True'})
    }else{
        res.status(400).json({msg: 'False'})
    }


})


module.exports = router