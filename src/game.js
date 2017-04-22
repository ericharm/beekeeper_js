var World = require("./world.js");
var Beekeeper = require("./entities/beekeeper.js");
var Hive = require("./entities/hive.js");
var Player = require("./player.js");

var Game = function(context) {

    // private data
    context.beekeeper = new Beekeeper([], {
        position: {x: 100, y: 100}
    });
    context.hive = new Hive([], {
        position: {x: 300, y: 300}
    });
    context.commandQueue = [];

    var world = World(context);
    var player = Player(context.commandQueue);

    // public interface
    var self = {
        tick: function (deltaTime) {
            world.update(deltaTime);
            world.render();
        },
        processEvent: function (event, isKeyPressed) {
            player.processEvent(event, isKeyPressed); 
        }
    };
    return self;


};

module.exports = Game;

