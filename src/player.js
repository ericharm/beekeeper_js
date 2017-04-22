// turn input into commands and send them into the command queue.
// could create a different player object for different game states
// by passing a custom processEvent() function to the constructor
// and putting keys object in its own module.
var Command = require("./command.js");

var Player = function (commandQueue) {

    var keys = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39
    };

    var self = {
        processEvent: function (event, isKeyPressed) {
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

