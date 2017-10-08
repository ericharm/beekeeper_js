var Config = require("../../config/app.js");
var Keys = require("../../config/keys.js");
var Audio = require("../../config/audio.js");
var Sound = require("../../lib/sound.js");
var Game = require("./game.js");
var HighScores = require("./highscores.js");
var Instructions = require("./instructions.js");
var Credits = require("./credits.js");

var MainMenu = function (context) {

    var canvas = context.canvas;
    var font="30px PressStart";
    canvas.font = font;
    var selectSound = Sound(Audio.mp3s.select);
    var scrollSound = Sound(Audio.mp3s.scroll);

    var options = [
        { text: "Play", location: {x: 200, y: 250} },
        { text: "High Scores", location: {x: 200, y: 350} },
        { text: "Instructions", location: {x: 200, y: 450} },
        { text: "Credits", location: {x: 200, y: 550} }
    ];

    var optionNames = {
        Play: 0,
        Highscores: 1,
        Instructions: 2,
        Credits: 3
    };

    var activeOption = 0;

    function drawOption (canvas, option) {
        canvas.fillStyle = "#efefef";
        canvas.fillText(option.text, option.location.x, option.location.y);
    }

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            if (event.keyCode == Keys.Up && activeOption > 0 && isKeyPressed) {
                scrollSound.play();
                activeOption -= 1;
            } else if (event.keyCode == Keys.Down && activeOption < (options.length - 1) && isKeyPressed) {
                scrollSound.play();
                activeOption += 1;
            }
        },
        processEvent: function (event) {
            if (event.keyCode == Keys.Enter) {
                selectSound.play();
                switch (activeOption) {
                    case optionNames.Play:
                        context.stateStack.pop();
                        context.stateStack.push(Game(context));
                        break;
                    case optionNames.Highscores:
                        context.stateStack.pop();
                        context.stateStack.push(HighScores(context));
                        break;
                    case optionNames.Instructions:
                        context.stateStack.pop();
                        context.stateStack.push(Instructions(context));
                        break;
                    case optionNames.Credits:
                        context.stateStack.pop();
                        context.stateStack.push(Credits(context));
                        break;
                }
            }
        },
        update: function (deltaTime) {
            // not implemented
        },
        draw: function (canvas) {
            canvas.fillStyle="#000000";
            canvas.fillRect(0, 0, Config.canvasWidth, Config.canvasHeight);
            canvas.fillStyle="#00ff00";
            canvas.fillText("Main Menu", 280, 90);

            for (var i = 0; i < options.length; i++ ) {
                if (i == activeOption) {
                    canvas.fillStyle = "#444444";
                    canvas.fillRect(
                        options[i].location.x - 10, options[i].location.y - 50,
                        options[i].text.length * 34, 80
                    );
                }
                drawOption(canvas, options[i]);
            }
        }
    };

    return self;

};

module.exports = MainMenu;

