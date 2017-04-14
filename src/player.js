var Entity = require("./entity.js");
var Textures = require("./textures.js");
var Sprite = Textures.Sprite; // require("./sprite.js");

module.exports = {

    new: function () {

        // inherit from Entity
        var self = Entity.new();
        
        // private data
        var sprite = Sprite.new(Textures.player);
        self._velocity = {x:2, y:2};

        // protected overrides
        self._updateCurrent = function(deltaTime) {
            var movement = {
                x: 0.0,
                y: 0.0
            };
            if (self.movingUp)
                movement.y -= self._velocity.y * deltaTime;
            if (self.movingDown)
                movement.y += self._velocity.y * deltaTime;
            if (self.movingLeft)
                movement.x -= self._velocity.x * deltaTime;
            if (self.movingRight)
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

