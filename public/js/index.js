var Application = require("../../src/lib/application.js");
var Config = require("../../src/config/config.js");
var InitialState = require("../../src/states/title_screen.js");

$(document).ready(function () {

    //private data
    var context = {
        events: []
    };

    var previous = window.performance.now();
    var fps = Config.frameRate;
    var canvasElement = document.getElementById("canvas");
    canvasElement.setAttribute("width", Config.canvasWidth);
    canvasElement.setAttribute("height", Config.canvasHeight);

    // private methods
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

    // main();
    var main = (function () {
        if (canvasElement.getContext) {
            
            var ctx = canvas.getContext("2d");
            context.canvas = ctx;
            context.stateStack = [];
            context.commandQueue = [];

            var app = Application(context);
            addListeners(app);

            // set the initial state
            context.stateStack.push(InitialState(context));

            // game loop 
            setInterval(function () {
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

