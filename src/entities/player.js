var Entity = require("../entity.js");
var Textures = require("../textures.js");
var Sprite = Textures.Sprite;

module.exports = {

    new: function () {

        // inherit from Entity
        var self = Entity.new();

        self.setMoving = function(direction, value) {
            switch (direction) {
                case 'up':
                    self._movingUp = value;
                    break;
                case 'down':
                    self._movingDown = value;
                    break;
                case 'left':
                    self._movingLeft = value;
                    break;
                case 'right':
                    self._movingRight = value;
                    break;
            }
        };

        // private data
        var sprite = Sprite.new(Textures.player);
        self._velocity = {x:2, y:2};

        // protected overrides
        self._updateCurrent = function(deltaTime) {
            var movement = {
                x: 0.0,
                y: 0.0
            };
            if (self._movingUp)
                movement.y -= self._velocity.y * deltaTime;
            if (self._movingDown)
                movement.y += self._velocity.y * deltaTime;
            if (self._movingLeft)
                movement.x -= self._velocity.x * deltaTime;
            if (self._movingRight)
                movement.x += self._velocity.x * deltaTime;
            self.move(movement);
        };

        self._renderCurrent = function (canvas) {
            canvas.drawImage(
                sprite,
                self.getPosition().x,
                self.getPosition().y
            );
        };

        return self;
    }

};

