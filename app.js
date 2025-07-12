const express = require('express')
const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/compras', require('./rotas/rotas_compras'))
app.use('/vendas', require('./rotas/rotas_vendas'))
app.use('/estoque', require('./rotas/rotas_estoque'))
app.use('/user', require('./rotas/rota_login'))


app.listen(3000, () =>{
    console.log("Estou te ouvindo na porta 3000")
})