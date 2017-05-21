var Config = require("../../config/app.js");
var Keys = require("../../config/keys.js");

var GameOver = function (context, score) {

    //private
    var canvas = context.canvas;
    var font="30px PressStart";
    canvas.font = font;

    var addInitialsField = function () {
        var input = document.createElement("input");
        input.type = "text";
        input.className = "initials";
        input.setAttribute('maxlength', 3);
        document.getElementById("canvas-div").appendChild(input);
        $(".initials:first").focus();
    };

    var self = {
        update: function (deltaTime) {
            //world.update(deltaTime);
        },
        draw: function (canvas) {
            //world.render();
            canvas.globalAlpha = 0.5;
            canvas.fillStyle = "#222200";
            canvas.fillRect(0, 0, Config.canvasWidth, Config.canvasHeight);
            canvas.globalAlpha = 1.0;
            canvas.fillStyle = "#aaaa33";
            canvas.fillText("GAME OVER", 250, 200);

            canvas.fillStyle = "#ffffff";
            canvas.fillText(score, 300, 300);
        },
        processRealtimeInput: function (event, isKeyPressed) {
            //player.processRealtimeInput(event, isKeyPressed); 
        },
        processEvent: function (event) {
            if (event.keyCode == Keys.Enter) {
                //call the high scores API with the value in the
                //input field
                $(".initials").remove();
                var MainMenu = require("./main_menu.js");
                context.stateStack.pop();
                context.stateStack.push(MainMenu(context));
            }
        }
    };

    addInitialsField();

    return self;
};

module.exports = GameOver;

