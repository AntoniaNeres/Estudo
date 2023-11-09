const express = require('express')
const app = express()
app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // envia o arquivo da página principal
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/', (req, res) => {
  // Envia uma string de resposta para a requisição realizada
  res.send("Um simples tutorial de NodeJS")
})

// Inicializa o servidor observando a porta 3000
app.listen(3000, () => {
  console.log('Server online')
})