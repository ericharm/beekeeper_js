var World = require("../models/world.js");
var Beekeeper = require("../models/entities/beekeeper.js");
var Hive = require("../models/entities/hive.js");
var Player = require("../controllers/player.js");

var Game = function (context) {

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
        update: function (deltaTime) {
            world.update(deltaTime);
        },
        draw: function (deltaTime) {
            world.render();
        },
        processRealtimeInput: function (event, isKeyPressed) {
            player.processRealtimeInput(event, isKeyPressed); 
        },
        processEvent: function (event) {
            // not implemented
        }
    };
    return self;
};

module.exports = Game;

