/*
 * Sets the initial state and manages the state stack.
 */
var Config = require("../config/app.js");
var InitialState = require("../config/init.js").state;

var Application = function (context) {

    var canvas = context.canvas;

    var stateStack = {
        stack: [],
        push: function (state) {
            this.stack.push(state);
        },
        pop: function () {
            this.stack.pop();
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
            var stackSize = this.stack.length;
            if (stackSize > 0) {
                var topState = this.stack[stackSize - 1];
                topState.update(deltaTime);
                // if (topState.fluid) update the other states
            }
        },
        draw: function (canvas) {
            // clear window
            canvas.fillStyle = "#000000";
            canvas.fillRect(0, 0, Config.canvasWidth, Config.canvasHeight);
            for (var i = 0; i < this.stack.length; i++) {
                // render each state starting at bottom of stateStack
                this.stack[i].draw(canvas);
            }
            // draw border
            canvas.fillStyle = "#aaaaaa";
            canvas.strokeRect(0, 0, Config.canvasWidth, Config.canvasHeight);
        },
        processRealtimeInput: function (event, isKeyPressed) {
            for (var i = this.stack.length - 1; i >= 0; i--) {
                // pass events to each state from top of stack to bottom
                this.stack[i].processRealtimeInput(event, isKeyPressed);
            }
        },
        processEvent: function (event) {
            var stackSize = this.stack.length;
            if (stackSize > 0) {
                var topState = this.stack[stackSize - 1];
                topState.processEvent(event);
                // if (topState.fluid) update the other states
            }
           //for (var i = this.stack.length - 1; i >= 0; i--) {
                //this.stack[i].processEvent(event);
            //}
        },
    };

    context.stateStack = stateStack;
    //context.world = World();
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
                // terminate
            }
            stateStack.update(deltaTime);
            stateStack.draw(canvas);
        }
    };

    return self;

};

module.exports = Application;

