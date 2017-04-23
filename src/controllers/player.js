var Command = require("../lib/command.js");
var keys = require("../config/keys.js");

var Player = function (commandQueue) {

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            if (event.keyCode == keys.Up) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('up', isKeyPressed);
                    // doesn't use deltaTime but we will figure that out
                }, ['beekeeper']));
            }

            if (event.keyCode == keys.Down) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('down', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode == keys.Left) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('left', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode == keys.Right) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('right', isKeyPressed);
                }, ['beekeeper']));
            }
        }
    };

    return self;

};

module.exports = Player;

