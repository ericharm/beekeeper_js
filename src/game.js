var Sprite = require("./sprite.js");

module.exports = {

    new: function (context) {

        // constructor
        // private data
        var canvas = context.canvas;
        var player = context.player;
        var sprite = Sprite.new(context.textures.Player);

        // private methods
        function update (deltaTime) {
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

        function render () {
            // clear window
            canvas.fillStyle = "#00aa00";
            canvas.fillRect(0, 0, 800, 600);
            canvas.fillStyle = "#aaaaaa";
            canvas.strokeRect(0, 0, 800, 600);
            // draw player
            // canvas.fillStyle = "#ff00ff";

            canvas.drawImage(
                sprite,
                player.getPosition().x,
                player.getPosition().y
            );
        }

        // public interface
        var self = {
            tick: function (deltaTime) {
                update(deltaTime);
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

