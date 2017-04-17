var World = require("./world.js");
var Beekeeper = require("./entities/beekeeper.js");
var Hive = require("./entities/hive.js");
var Command = require("./command.js");

module.exports = {

    new: function (context) {

        // private data
        context.beekeeper = new Beekeeper([], {
            position: {x: 100, y: 100}
        });
        context.hive = new Hive([], {
            position: {x: 300, y: 300}
        });
        var world = World.new(context);

        // public interface
        var self = {
            tick: function (deltaTime) {
                world.update(deltaTime);
                world.render();
            },
            processEvent: function (event, isKeyPressed) {
                // this should be sent to the player, who then adds commands to the queue
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

