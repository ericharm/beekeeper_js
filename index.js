var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var multer = require("multer");
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname + "/public/templates/")));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
// move this into a node module
app.use('/src', express.static(__dirname + '/public/src'));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.listen(8081, function () {
    var host = "localhost";
    var port = "8081";
    console.log("Example app listening at http://%s:%s", host, port);
    console.log(" /\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\");
    console.log("| |   b e e  k e e p e r   | |");
    console.log(" \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/");
});

app.get("/", function (req, res) {
    res.render("index.ejs", {
    });
});

