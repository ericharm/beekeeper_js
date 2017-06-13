var Config = require("../../config/app.js");
var Keys = require("../../config/keys.js");

var HighscoresState = function (context) {

    var canvas = context.canvas;
    var titleFont= "30px PressStart";
    var messageFont = "16px PressStart";


    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            // no implementation
        },
        processEvent: function (event) {
            if (event.keyCode == Keys.Enter) {
                var MainMenu = require("./main_menu.js");
                context.stateStack.pop();
                context.stateStack.push(MainMenu(context));
            }
        },
        update: function (deltaTime) {
            // no implementation
        },
        draw: function (canvas) {
            // Background
            canvas.fillStyle = "#000000";
            canvas.fillRect(0, 0, Config.canvasWidth, Config.canvasHeight);
            // Title
            canvas.fillStyle = "#00ff00";
            canvas.font = titleFont;
            canvas.fillText("high scores", 150, 50);
            // Message
            canvas.fillStyle = "#cdcdcd";
            canvas.font = messageFont;
            var y = 100;
            var scores = this._highscores;
            for (var i = 0; i < scores.length; i++) {
                canvas.fillText((i+1) + " " + scores[i].initials + " " + scores[i].score, 228, y);
                y += 50;
            }
        },
        setHighscores: function (scores) {
            this._highscores = scores;
        },
        _highscores: []
    };

    var getHighscores = function (score, initials) {
        $.ajax({
            type: "GET",
            url: "/highscores",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                self.setHighscores(data);
            },
            failure: function(errMsg) {
                console.log(errMsg);
            }
        });
    };

    getHighscores();

    return self;

};

module.exports = HighscoresState;

