const express = require('express')
const app = express()
/*
const data = require('./articles.json')
const fs = require('fs')
*/
const path = require('path')
const cors = require('cors')

app.use(cors())

app.get('/', function (request,response) {
    response.send('Hello World')
})

app.get('/articles', function (request, response) {
    response.header('Content-Type', 'application/json') /*text/plain // x-www-form-urlencoded*/
    response.set('Access-Control-Allow-Origin', '*')

    /*
    fs.readFile('./customer.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
    })
    */

    response.sendFile(path.resolve('./articles.json'))
    //response.send(JSON.stringify(data))
})

console.log("Server is running...")
app.listen(3001)