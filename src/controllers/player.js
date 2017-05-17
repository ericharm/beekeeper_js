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

        },
        processEvent: function (event) {
            if (event.keyCode === Keys.Space) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.shootBee(deltaTime, node.getPosition(), commandQueue);
                }, ['hive']));
            }
            if (event.keyCode === Keys.a) {
                stateStack.push(Pause(context));
            }
            if (event.keyCode === Keys.z) {
                commandQueue.push(Command(function (node, deltaTime) {
                    node.shootSmoke(deltaTime, node.getCenter(), commandQueue);
                }, ['beekeeper']));
            }
        }
    };

    return self;

};

module.exports = Player;

