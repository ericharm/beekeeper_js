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

