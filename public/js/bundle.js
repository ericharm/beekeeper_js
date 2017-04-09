(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Game = require('../../src/Game.js');

$(document).ready(function () {

    function addListeners(game) {
        window.addEventListener('keydown', function (event) {
            game.processEvent(event, true);
        }, false);
        window.addEventListener('keyup', function (event) {
            game.processEvent(event, false);
        }, false);
    }

    var context = {
        canvas: undefined
    };

    var player = {
        size: 20,
        position: {x: 100.0, y: 100.0},
        color: "#aaaaaa",
        movingUp: false,
        movingLeft: false,
        movingRight: false,
        movingDown: false,
        move: function (movement) {
            this.position.x += movement.x;
            this.position.y += movement.y;
        }
    };

    var canvasElement = document.getElementById("canvas");

    if (canvasElement.getContext) {
        var ctx = canvas.getContext("2d");
        context.canvas = ctx;
        game = Game.new(context, player);
        addListeners(game);
        setInterval(game.tick, 1000 / 60.0);
    }
    else {
        throw 'CanvasError';
    }
});


},{"../../src/Game.js":2}],2:[function(require,module,exports){
module.exports = {

    new: function (context, player) {

        var canvas = context.canvas;

        function update(deltaTime) {
            var movement = {
                x: 0.0,
                y: 0.0
            };
            if (player.movingUp)
                movement.y -= 1.0 * deltaTime;
            if (player.movingDown)
                movement.y += 1.0 * deltaTime;
            if (player.movingLeft)
                movement.x -= 1.0 * deltaTime;
            if (player.movingRight)
                movement.x += 1.0 * deltaTime;
           player.move(movement);
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
                update(1); // pass delta time
                render();
            },
            processEvent: function (event, isKeyPressed) {
                switch (event.keyCode) {
                    case 37: // Left
                        player.movingLeft = isKeyPressed;
                        break;
                    case 38: // Up
                        player.movingUp = isKeyPressed;
                        break;
                    case 39: // Right
                        player.movingRight = isKeyPressed;
                        break;
                    case 40: // Down
                        player.movingDown = isKeyPressed;
                        break;
                }
            }
        };
        return self;
    }
};


},{}]},{},[1]);
