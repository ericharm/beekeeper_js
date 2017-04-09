var World = require("../../src/world.js");
var Game = require("../../src/game.js");
var Textures = require("../../src/textures.js");
var Player = require("../../src/player.js");


$(document).ready(function () {

    //private data
    var context = {
        canvas: undefined,
        textures: Textures.load(),
        fonts: undefined,
        player: Player.new()
    };

    var previous = window.performance.now();
    var fps = 30.0;
    var canvasElement = document.getElementById("canvas");

    // private methods
    function addListeners(game) {
        window.addEventListener('keydown', function (event) {
            game.processEvent(event, true);
        }, false);
        window.addEventListener('keyup', function (event) {
            game.processEvent(event, false);
        }, false);
    }

    // main();
    var main = (function () {
        if (canvasElement.getContext) {
            
            var ctx = canvas.getContext("2d");
            context.canvas = ctx;

            // eventually also pass state stack with
            // the context
            game = Game.new(context);
            addListeners(game);

            // game loop 
            setInterval(function () {

                var now = window.performance.now();
                var delta = now - previous;

                game.tick(delta / fps);

                previous = window.performance.now();
            
            }, 1000 / fps);

        }
        else {
            throw 'CanvasError';
        }
    }());

});

