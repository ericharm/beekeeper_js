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

/*
 *  Templates
 */
app.set("views", path.join(__dirname, "/templates"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/*
 *  Server
 */
var host = "localhost";
var port = "8081";

app.listen(port, function () {
    console.log(" .-.");
    console.log(" \\ /");
    console.log("{|||)<");
    console.log(" / \\ b e e k e e p e r");
    console.log(" `-´");
    console.log("Listening at http://%s:%s", host, port);
});

/*
 *  Routes
 */
app.get("/", function (req, res) {
    res.render("index.ejs");
});

