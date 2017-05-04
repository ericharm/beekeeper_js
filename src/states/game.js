var World = require("../models/world.js");
var Player = require("../controllers/player.js");

var Game = function (context) {

    context.commandQueue = [];
    var world = World(context);
    var player = Player(context.commandQueue);

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

