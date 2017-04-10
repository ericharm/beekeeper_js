var World = require("./world.js");
var Sprite = require("./sprite.js");

module.exports = {

    new: function (context) {

        // private data
        var world = World.new(context);

        // public interface
        var self = {
            tick: function (deltaTime) {
                world.update(deltaTime);
                world.render();
            },
            processEvent: function (event, isKeyPressed) {
                switch (event.keyCode) {
                    case 37: // Left
                        context.player.movingLeft = isKeyPressed;
                        break;
                    case 38: // Up
                        context.player.movingUp = isKeyPressed;
                        break;
                    case 39: // Right
                        context.player.movingRight = isKeyPressed;
                        break;
                    case 40: // Down
                        context.player.movingDown = isKeyPressed;
                        break;
                }
            }
        };
        return self;
    }
};

