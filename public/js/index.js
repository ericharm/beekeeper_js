var Application = require("../../src/lib/application.js");
var Config = require("../../src/config/app.js");

$(document).ready(function () {

    // holds references to canvas, commandQueue,
    // game objects and stateStack
    var context = {};

    var fps = Config.frameRate;
    var previous = window.performance.now();
    var canvasElement = document.getElementById("canvas");
    canvasElement.setAttribute("width", Config.canvasWidth);
    canvasElement.setAttribute("height", Config.canvasHeight);

    // Keyboard input
    function addListeners(app) {
        window.addEventListener('keydown', function (event) {
            app.processRealtimeInput(event, true);
        }, false);
        window.addEventListener('keyup', function (event) {
            app.processRealtimeInput(event, false);
        }, false);
        window.addEventListener('keypress', function (event) {
           app.processEvent(event); 
        }, false);
    }

    /*
     * main
     */
    var main = (function () {
        if (canvasElement.getContext) {
            
            var ctx = canvas.getContext("2d");

            // render
            context.canvas = ctx;

            // input
            context.commandQueue = [];

            var app = Application(context);
            addListeners(app);

            // game loop 
            setInterval(function () {
                // fixed step updating
                var now = window.performance.now();
                var delta = now - previous;
                app.tick(delta / fps);
                previous = window.performance.now();
            }, 1000 / fps);

        }
        else {
            throw 'CanvasError';
        }
    }());

});

