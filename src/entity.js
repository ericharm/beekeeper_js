module.exports = {

    new: function () {

        // private data
        var position = {x: 0, y: 0};
        var velocity = {x: 0, y: 0};
        var movingUp = false;
        var movingLeft = false;
        var movingRight = false;
        var movingDown = false;

        // private methods
        function updateCurrent(deltaTime) {
            move({
                x: velocity.x * deltaTime,
                y: velocity.y * deltaTime
            });
        }

        return {
            move: function (movement) {
                position.x += movement.x;
                position.y += movement.y;
            },
            getPosition: function () {
                return position;
            },
            setVelocity: function (vector) {
                velocity = vector;
            },
            getVelocity: function () {
                return velocity;
            }
        };
    }
};
