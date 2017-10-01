/*
 *  Modules for express
 */
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var path = require("path");
var bodyParser = require("body-parser");
var multer = require("multer");
var express = require("express");
var fs = require('fs');

/*
 * Middleware
 */
var csrfProtection = csrf({cookie: true});
var parseForm = bodyParser.urlencoded({ extended: false });

/*
 * Initialize and configure express
 */
var app = express();
app.use(cookieParser());

/*
 *  Asset paths
 */
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/audio", express.static(__dirname + "/public/audio"));
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
app.get("/", csrfProtection, function (req, res) {
    var audioDirectory = './public/audio/';
    files = fs.readdirSync(audioDirectory).reduce(function (audioFiles, file) {
        if (file.split(".")[0] !== '') audioFiles.push(file.split(".")[0]);
        return audioFiles;
    }, []);
    console.log(files);
    res.render('index.ejs', { csrfToken: req.csrfToken(), audioFiles: files });
});

// Highscores API
app.get("/highscores", function (req, res) {
    db.collection('highscores')
        .find().sort({score: -1})
        .limit(10).toArray(function (err, scores) {
        if (err) return console.dir(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(scores));
    });
});

app.post("/highscores", parseForm, csrfProtection, function (req, res) {
    var score = {
        initials: req.body.initials.toUpperCase(),
        score: Number(req.body.score)
    };
    db.collection('highscores').insert(score);
    res.setHeader('Content-Type', 'application/json');
    res.json(score);
});

