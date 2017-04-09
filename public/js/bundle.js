(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Game = require('../../src/Game.js');

$(document).ready(function () {

    var context = {
        canvas: undefined
    }

    var player = {
        size: 20,
        position: {x: 100.0, y: 100.0},
        color: "#aaaaaa"
    };

    var canvasElement = document.getElementById("canvas");

    if (canvasElement.getContext) {
        var ctx = canvas.getContext("2d");
        context.canvas = ctx;
        game = Game.new(context, player);
        addListener(game);
        setInterval(game.tick, 1000 / 60.0);
    }
    else {
        throw 'CanvasError';
    }
});

function addListener(game) {
    window.addEventListener('keydown', function(event) {
        game.processEvent(event);
    }, false);
}




},{"../../src/Game.js":2}],2:[function(require,module,exports){
module.exports = {

    new: function (context, player) {
        "use strict";

        var canvas = context.canvas;

        function update(deltaTime) {
        }

        function render() {
            // clear window
            canvas.fillStyle = "#ffffff";
            canvas.fillRect(0, 0, 800, 600);
            canvas.fillStyle = "#aaaaaa";
            canvas.strokeRect(0, 0, 800, 600);
            // draw player
            canvas.fillStyle = "#ff00ff";
            canvas.fillRect(
                player.position.x,
                player.position.y,
                player.size,
                player.size
            );
        }

        var self = {
            tick: function () {
                update(); // pass delta time
                render(); // pass ctx
            },
            processEvent: function (event) {
                switch (event.keyCode) {
                    case 37: // Left
                        // Game.player.moveLeft();
                        console.log("lefto");
                        break;

                    case 38: // Up
                        // Game.player.moveUp();
                        console.log("up");
                        break;

                    case 39: // Right
                        // Game.player.mopleftveRight();
                        console.log("right");
                        break;

                    case 40: // Down
                        console.log("down");
                        // Game.player.moveDown();
                        break;
                }
            }
        };
        return self;
    }
};


},{}]},{},[1]);
