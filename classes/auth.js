const jwt = require('jsonwebtoken')

module.exports = {
    validaAcesso: (req,res,next) =>{
        let beartoken = req.headers['authorization'] || ''
        let token = beartoken.split(" ")
        if(token[0] == 'Bearer'){
            token = token[1]
        }
        jwt.verify(token, 'UFind', (err, obj)=>{
            if(err) res.status(401).json({msg: "token inválido " +err})
            else{
                req.usuario = obj.usuario
                next()
            }
        })
    }
}