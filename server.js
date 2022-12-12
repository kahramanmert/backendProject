const express = require('express')
const app = express()
const data = require('./articles.json')
const fs = require('fs');

app.get('/', function (request,response) {
    response.send('Hello World')
})

app.get('/articles', function (request, response) {
    response.header("Content-Type", "application/json")
    response.send(JSON.stringify(data))
})

console.log("Server is running...")
app.listen(3001)