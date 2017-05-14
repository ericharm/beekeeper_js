var Keys = require("../../config/keys.js");

var Pause = function (context) {

    var canvas = context.canvas;

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
            canvas.fillText("PAUSE", 300, 200);
        },
        processRealtimeInput: function (event, isKeyPressed) {
            //player.processRealtimeInput(event, isKeyPressed); 
        },
        processEvent: function (event) {
            if (event.keyCode === Keys.s) {
                context.stateStack.pop();
            }
        },
    };
    return self;
};

module.exports = Pause;

