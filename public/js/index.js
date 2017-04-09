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
