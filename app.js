const express = require('express')
const path = require('path')

const app = express()

const mainFilePath = path.join(__dirname, './src/views/index.pug')
const pug = require('pug')
const mainPage = pug.compileFile(mainFilePath)

app.use(express.static(path.join(__dirname, './dist')))

app.get('/', (req, res) => {
	res.send(mainPage({}))
})

app.get('/obj', (req, res) => {
	res.sendFile(path.join(__dirname, './obj.obj'))
})

app.use((error, req, res, next) => {
	res.status(500).send({ error: error.message })
})

app.listen(process.env.PORT || 3000)
