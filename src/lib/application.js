var InitialState = require("../../src/states/title_screen.js");

var Application = function (context) {

    var canvas = context.canvas;
    var stateStack = {
        stack: [],
        push: function (state) {
            this.stack.push(state);
        },
        pop: function (state) {
            return this.stack.pop();
        },
        emptyStack: function () {
            while (this.stack.length > 0) {
                this.stack.pop();
            }
        },
        isEmpty: function () {
            return (this.stack.length === 0);
        },
        update: function (deltaTime) {
            for (var i = this.stack.length - 1; i >= 0; i--) {
                // update each state from top of stack to bottom
                this.stack[i].update(deltaTime);
            }
        },
        draw: function (canvas) {
            for (var i = 0; i < this.stack.length; i++) {
                // render each state starting at bottom of stateStack
                this.stack[i].draw(canvas);
            }
        },
        processRealtimeInput: function (event, isKeyPressed) {
            for (var i = this.stack.length - 1; i >= 0; i--) {
                // pass events to each state from top of stack to bottom
                this.stack[i].processRealtimeInput(event, isKeyPressed);
            }
        },
        processEvent: function (event) {
           for (var i = this.stack.length - 1; i >= 0; i--) {
                this.stack[i].processEvent(event);
            }
        },
    };

    context.stateStack = stateStack;
    stateStack.push(InitialState(context));    

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            stateStack.processRealtimeInput(event, isKeyPressed);
        },
        processEvent: function (event) {
            stateStack.processEvent(event);
        },
        tick: function (deltaTime) {
            if (stateStack.isEmpty()) {
                context.canvas.fillStyle = "#ffffff";
                context.canvas.fillRect(0, 0, Config.canvasWidth, Config.canvasHeight);
                // terminate execution
            }
            stateStack.update(deltaTime);
            stateStack.draw(canvas);
        }
    };

    return self;

};

module.exports = Application;

