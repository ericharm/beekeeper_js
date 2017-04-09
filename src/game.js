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

