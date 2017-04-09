module.exports = {

    new: function (context, player) {

        // constructor
        // declare private data
        var canvas = context.canvas;
        
        var texture = new Image();
        texture.src = "images/alien.png";
        var sprite = texture;

        // private methods
        function update(deltaTime) {
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

        function render() {
            // clear window
            canvas.fillStyle = "#00aa00";
            canvas.fillRect(0, 0, 800, 600);
            canvas.fillStyle = "#aaaaaa";
            canvas.strokeRect(0, 0, 800, 600);
            // draw player
            // canvas.fillStyle = "#ff00ff";
            canvas.drawImage(
                sprite,
                player.position.x,
                player.position.y
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

