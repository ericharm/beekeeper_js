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
                        Command.setMoving(context.player, 'left', isKeyPressed);
                        break;
                    case 38: // Up
                        Command.setMoving(context.player, 'up', isKeyPressed);
                        break;
                    case 39: // Right
                        Command.setMoving(context.player, 'right', isKeyPressed);
                        break;
                    case 40: // Down
                        Command.setMoving(context.player, 'down', isKeyPressed);
                        break;
                }
            }
        };
        return self;
    }
};

