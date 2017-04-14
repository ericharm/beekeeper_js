var SceneNode = require("./scene_node.js");

module.exports = {

    new: function () {

        // inherit from SceneNode
        var self = SceneNode.new();
        // overrides
        self._updateCurrent = function (deltaTime) {
            self.move({
                x: self._velocity.x * deltaTime,
                y: self._velocity.y * deltaTime
            });
        };
        // augmented interface
        self.move = function (movement) {
            self._position.x += movement.x;
            self._position.y += movement.y;
        };
        self.getPosition = function () {
            return self._position;
        };
        self.setVelocity = function (vector) {
            self._velocity = vector;
        };
        self.getVelocity = function () {
            return self._velocity;
        };
        // protected
        self._position = {x: 0, y: 0};
        self._velocity = {x: 0, y: 0};
        self._movingUp = false;
        self._movingLeft = false;
        self._movingRight = false;
        self._movingDown = false;
        
        return self;
    }
};
