var World = require("./world.js");
var Player = require("./player.js");
var Hive = require("./hive.js");
var Command = require("./command.js");

module.exports = {

    new: function (context) {

        // private data
        context.player = Player.new();
        context.hive = Hive.new();
        var world = World.new(context);
        // public interface
        var self = {
            tick: function (deltaTime) {
                world.update(deltaTime);
                world.render();
            },
            processEvent: function (event, isKeyPressed) {
                // this should probably be handled somewhere else
                switch (event.keyCode) {
                    case 37: // Left
                        // context.player.movingLeft = isKeyPressed;
                        Command.moveLeft(context.player);
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

