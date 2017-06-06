var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

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
