module.exports = {

    new: function () {
        return {
            size: 20,
            position: {x: 100.0, y: 100.0},
            color: "#aaaaaa",
            movingUp: false,
            movingLeft: false,
            movingRight: false,
            movingDown: false,
            move: function (movement) {
                this.position.x += movement.x;
                this.position.y += movement.y;
            }
        };

    }

};
