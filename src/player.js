var Entity = require("./entity.js");
var Textures = require("./textures.js");
var Sprite = require("./sprite.js");

module.exports = {

    new: function (children, parent) {

        // inherit from Entity
        var self = Entity.new(children, parent);
        
        // private data
        var textures = Textures.load();
        var sprite = Sprite.new(textures.player);
        var velocity = {x:2, y:2};

        // public overrides
        self.updateCurrent = function(deltaTime) {
            var movement = {
                x: 0.0,
                y: 0.0
            };
            // how is this accessing the private 'movingUp' variable?
            // in game.js, the handler is creating it as public
            if (self.movingUp)
                movement.y -= velocity.y * deltaTime;
            if (self.movingDown)
                movement.y += velocity.y * deltaTime;
            if (self.movingLeft)
                movement.x -= velocity.x * deltaTime;
            if (self.movingRight)
                movement.x += velocity.x * deltaTime;
           self.move(movement);
        };

        self.renderCurrent = function (canvas) {
            canvas.drawImage(
                sprite,
                self.getPosition().x,
                self.getPosition().y
            );
        };
        
        return self;
    }

};

