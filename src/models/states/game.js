var World = require("../../lib/world.js");
var Player = require("../../controllers/player.js");
var LevelOne = require("../scenes/level_one.js");

var Game = function (context) {

    // World object should manage commandQueue
    // and add it to context and pass it to game
    context.commandQueue = [];
    var scene = LevelOne();
    var world = World(context, scene);
    var player = Player(context);

    var self = {
        update: function (deltaTime) {
            world.update(deltaTime);
        },
        draw: function () {
            world.render();
        },
        processRealtimeInput: function (event, isKeyPressed) {
            player.processRealtimeInput(event, isKeyPressed); 
        },
        processEvent: function (event) {
            player.processEvent(event); 
        },
    };
    return self;
};

module.exports = Game;

