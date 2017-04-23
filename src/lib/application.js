var Application = function (context) {

    var canvas = context.canvas;
    var stateStack = context.stateStack;
    
    var isStackEmpty = function () {
        return (stateStack.length === 0);
    };

    var update = function (deltaTime) {
        for (var i = stateStack.length - 1; i >= 0; i--) {
            // update each state from top of stack to bottom
            stateStack[i].update(deltaTime);
        }
    };

    var draw = function (canvas) {
        for (var i = 0; i < stateStack.length; i++) {
            // render each state starting at bottom of stateStack
            stateStack[i].draw(canvas);
        }
    };

    var self = {
        processRealtimeInput: function (event, isKeyPressed) {
            for (var i = stateStack.length - 1; i >= 0; i--) {
                // pass events to each state from top of stack to bottom
                stateStack[i].processRealtimeInput(event, isKeyPressed);
            }
        },
        processEvent: function (event) {
           for (var i = stateStack.length - 1; i >= 0; i--) {
                stateStack[i].processEvent(event);
            }
        },
        tick: function (deltaTime) {
            if (isStackEmpty()) {
                // terminate execution
                console.log("All gone!");
            }
            update(deltaTime);
            draw(canvas);
        }
    };

    return self;

};

module.exports = Application;

