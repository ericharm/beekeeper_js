var Config = require("../../config/app.js");
var Keys = require("../../config/keys.js");
var Game = require("../states/game.js");

var MainMenu = function (context) {

    var canvas = context.canvas;
    var font="30px PressStart";
    canvas.font = font;

    var options = [
        { text: "Play", location: {x: 200, y: 300} },
        { text: "Exit", location: {x: 200, y: 400} }
    ];

    var optionNames = {
        Play: 0,
        Exit: 1
    };

    var activeOption = 0;

    function drawOption (canvas, option) {
        canvas.fillStyle = "#efefef";
        canvas.fillText(option.text, option.location.x, option.location.y);
    }

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            if (event.keyCode == Keys.Up && activeOption > 0) {
                activeOption -= 1;
            } else if (event.keyCode == Keys.Down && activeOption < (options.length - 1)) {
                activeOption += 1;
            }
        },
        processEvent: function (event) {
            if (event.keyCode == Keys.Enter) {
                switch (activeOption) {
                    case optionNames.Play:
                        context.stateStack.pop();
                        context.stateStack.push(Game(context));
                        break;
                    case optionNames.Exit:
                        context.stateStack.emptyStack(); 
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
                    canvas.fillRect(options[i].location.x - 10, options[i].location.y - 50, 200, 80);
                }
                drawOption(canvas, options[i]);
            }
        }
    };

    return self;

};

module.exports = MainMenu;

