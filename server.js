var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Escuchando en 3000');
})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "series"
});

app.get('/getquery', function (req, res) {
    a = req.query.option;
    if (a == "demografia") { query = "select nombre from demografia" }
    if (a == "genero") { query = "select * from genero" }
    if (a == "autores") { query = "select * from creador" }
    if (a == "serie") { query = "select * from serie" }
    if (a == "emisora") { query = "select * from emisora" }


        
        con.query(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

app.post('/insert', function(req,res){
    a = req.query.sql

    con.query(a, function(err,result){
        if(err) throw err;
        res.end();
    })
})

