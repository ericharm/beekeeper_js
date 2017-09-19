var Config = require("../../config/app.js");
var Keys = require("../../config/keys.js");

var Credits = function (context) {

    var canvas = context.canvas;
    var titleFont= "30px PressStart";
    var messageFont = "16px PressStart";

    var self = {
        update: function (deltaTime) {
            //world.update(deltaTime);
        },
        draw: function (canvas) {
            canvas.font = titleFont;
            canvas.fillStyle = "#aaaa33";
            canvas.fillText("Credits", 300, 100);

            canvas.font = messageFont;
            canvas.fillStyle = "#aa33aa";
            canvas.fillText("Programming by", 146, 200);
            canvas.fillText("Music by", 240, 250);
            canvas.fillText("Artwork by", 210, 300);

            canvas.fillStyle = "#aaaaaa";
            canvas.fillText("Eric Harm", 400, 200);
            canvas.fillText("Luke Chiaruttini", 400, 250);
            canvas.fillText("Tyler Clark", 400, 300);

            canvas.fillStyle = "#33aa33";
            canvas.fillText("Additional artwork used by CC0 license from:", 100, 360);
            canvas.fillStyle = "#aaaaaa";
            canvas.fillText("https://kenney.nl/", 100, 400);
            canvas.fillText("nightcharges https://www.vecteezy.com/", 100, 430);
            canvas.fillText("https://emojiterra.com/de/spritze/", 100, 460);
        },
        processRealtimeInput: function (event, isKeyPressed) {
            //player.processRealtimeInput(event, isKeyPressed);
        },
        processEvent: function (event) {
            if (event.keyCode === Keys.Enter) {
                var MainMenu = require("./main_menu.js");
                context.stateStack.pop();
                context.stateStack.push(MainMenu(context));
            }
        }
    };
    return self;
};

module.exports = Credits;

