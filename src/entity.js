var SceneNode = require("./scene_node.js");

module.exports = {

    new: function (children, parent) {

        // inherit from SceneNode
        var self = SceneNode.new(children, parent);

        // private data
        var position = {x: 0, y: 0};
        var velocity = {x: 0, y: 0};
        var movingUp = false;
        var movingLeft = false;
        var movingRight = false;
        var movingDown = false;

        // overrides
        self.updateCurrent = function (deltaTime) {
            self.move({
                x: velocity.x * deltaTime,
                y: velocity.y * deltaTime
            });
        };

        // extended interface
        self.move = function (movement) {
            position.x += movement.x;
            position.y += movement.y;
        };
        self.getPosition = function () {
            return position;
        };
        self.setVelocity = function (vector) {
            velocity = vector;
        };
        self.getVelocity = function () {
            return velocity;
        };
        return self;
    }
};
