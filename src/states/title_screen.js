var MainMenu = require("./main_menu.js");
var Config = require("../config/config.js");
var Keys = require("../config/keys.js");

var TitleScreen = function (context) {

    var canvas = context.canvas;
    var titleFont= "30px Arial";
    var messageFont = "16px Arial";

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            // no implementation
        },
        processEvent: function (event) {
            if (event.keyCode == Keys.Enter) {
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
            canvas.fillText("b e e k e e p e r", 280, 190);
            // Message
            canvas.fillStyle = "#cdcdcd";
            canvas.font = messageFont;
            canvas.fillText("Press enter to continue", 288, 290);
        }
    };

    return self;

};

module.exports = TitleScreen;

