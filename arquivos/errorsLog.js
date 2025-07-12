const fs = require('fs').promises
const path = require('path')

const caminho = path.resolve(__dirname, '../arquivos/logs.json')

const lerJson = async () => {
    const data = await fs.readFile(caminho)
    const dados = JSON.parse(data)
    return dados
}

module.exports = {

    async escreveJson(logs) {
        const dados = await lerJson()
        dados.push(logs)

        let result = await fs.writeFile(caminho, JSON.stringify(dados))
        return result
    }


}
