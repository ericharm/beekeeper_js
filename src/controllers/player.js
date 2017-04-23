/*
 * Player converts input into commands and sends
 * them to the command queue.
 */

var Command = require("../lib/command.js");
var Keys = require("../config/keys.js");

var Player = function (commandQueue) {

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            if (event.keyCode == Keys.Up) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('up', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode == Keys.Down) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('down', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode == Keys.Left) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('left', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode == Keys.Right) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    node.setMoving('right', isKeyPressed);
                }, ['beekeeper']));
            }
        }
    };

    return self;

};

module.exports = Player;

