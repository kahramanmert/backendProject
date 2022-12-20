const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const bodyparser = require('body-parser')
const jsonParser = bodyparser.json();

const mysql = require('mysql');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'MyNewDataBasePassWord8+',
    database: 'users'
});

db.connect(function (err) {
    if (err){
        console.log('Error connecting...' + err);
    }
    console.log('Connected database...');
});

app.use(cors())
app.use(bodyparser.urlencoded({extended: true}))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function (request,response) {
    response.send('Here is server side...')
})

app.get('/articles', function (request, response) {
    response.header('Content-Type', 'application/json') /*text/plain // x-www-form-urlencoded*/
    response.set('Access-Control-Allow-Origin', '*')
    response.sendFile(path.resolve('./articles.json'))
})

app.get('/myarticles', function (request, response) {
    db.query('SELECT * FROM users.articles_table', (err, result) => {
        if (err) throw err;
        console.log(result);
        response.send(result);
    })
})

app.get('/users', function (request, response) {
    db.query('SELECT * FROM users.users_table', (err, result) => {
        if (err) throw err;
        console.log(result);
        response.send(result);
    })

    /*
    fs.readFile(path.resolve('./users.txt'), 'utf8', (err, data) => {
        const users = JSON.parse(data);
        response.send(users);
    })
    */
})

app.post('/users', jsonParser, function (request, response) {

    console.log(request.body);
    let user = request.body;
    let sql = `INSERT INTO users.users_table(name, surname) VALUES ('${user.name}', '${user.surname}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        response.send('added...');
    });


    // console.log(request);
    // fs.writeFile(path.resolve('./users.txt'), JSON.stringify(request.body), (err) => {
    //     response.end();
    // })

})

app.delete('/users/:id',function (request, response)  {
    const id = request.params.id;
    console.log(request.params.id);
    db.query('DELETE FROM users.users_table WHERE id= ?', id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        response.send("deleted...");
    })
})

app.put('/users/:id', jsonParser, function (request, response) {
    console.log(request.body);
    const id = request.params.id;
    console.log(request.params.id);
    let user = request.body;
    let sql = `UPDATE users.users_table SET name = '${user.name}', surname = '${user.surname}'
               WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        console.log(result);
        response.send('updated...');
    });
})

console.log("Server is running...")
app.listen(3001)