const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function (request,response) {
    response.send('Hello World')
})

app.get('/articles', function (request, response) {
    response.header('Content-Type', 'application/json') /*text/plain // x-www-form-urlencoded*/
    response.set('Access-Control-Allow-Origin', '*')
    response.sendFile(path.resolve('./articles.json'))
})

console.log("Server is running...")
app.listen(3001)