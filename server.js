var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var multer = require('multer');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

// var fileUpload = require('express-fileupload');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = './' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    }
    if(req.url="/testdir"){
        var dir="./images";
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }
}).listen(8080);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var app = express();

// app.use(fileUpload());
// app.use(multer({

//  dest: './public/'

// }));
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/')
    }
});
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

app.post('/insert', function (req, res) {
    a = req.body.sql;

    con.query(a, function (err, result) {
        if (err) throw err;
        res.json({ status: 500, data: result.insertId });
        res.end();
    })
})
var upload = multer({
    storage: storage
}).single('file');
app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err) {
            console.log({ error_code: 1, err_desc: err });
            return;
        }
        console.log({ error_code: 0, err_desc: null });
    })
    //   req.files.foo.mv('/public/'+ req.files.foo.name, function(err) {
    //     if (err)
    //       return res.status(500).send(err);

    //     res.send('File uploaded!');
    //   });
})

