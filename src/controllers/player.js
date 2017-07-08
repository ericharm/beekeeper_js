/*
 * Player converts input into commands and sends
 * them to the command queue.
 */

var Command = require("../lib/command.js");
var Keys    = require("../config/keys.js");
var Pause = require("../models/states/pause.js");
var Player = function (context) {

    var commandQueue = context.commandQueue;
    var stateStack = context.stateStack;

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            if (event.keyCode === Keys.Up) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.setMoving('up', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode === Keys.Down) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.setMoving('down', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode === Keys.Left) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.setMoving('left', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode === Keys.Right) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.setMoving('right', isKeyPressed);
                }, ['beekeeper']));
            }

            if (event.keyCode === Keys.Space && isKeyPressed) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.activateSmoke(deltaTime, node.getCenter(), commandQueue);
                }, ['beekeeper']));
            }

            if (event.keyCode === Keys.Space && !isKeyPressed) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.deactivateSmoke(deltaTime, node.getCenter(), commandQueue);
                }, ['beekeeper']));
            }
        },
        processEvent: function (event) {
            if (event.keyCode === Keys.a) {
                stateStack.push(Pause(context));
            }
        }
    };

    return self;

};

module.exports = Player;

