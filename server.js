/*
 *  Modules for express
 */
var express = require("express");
var app = express();
var path = require("path");

/*
 *  Asset paths
 */
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/fonts", express.static(__dirname + "/public/fonts"));

/*
 *  Templates
 */
app.set("views", path.join(__dirname, "/templates"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/*
 *  Server / Database connection
 */
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost/beekeeper', function (err, dbConnection) {
    db = dbConnection;
    var host = "localhost";
    var port = "8081";
    var server = app.listen(8081, function () {
        console.log(" .-.");
        console.log(" \\ /");
        console.log("{|||)<");
        console.log(" / \\ b e e k e e p e r");
        console.log(" `-´");
        console.log("Listening at http://%s:%s", host, port);
    });
});


/*
 *  Routes
 */

// Root
app.get("/", function (req, res) {
    res.render("index.ejs");
});

// Highscores API
app.get("/highscores", function (req, res) {
    db.collection('highscores').find().toArray(function (err, scores) {
        if (err) return console.dir(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(scores));
    });
});

app.post("/highscores", function (req, res) {
    console.log(db);
});

