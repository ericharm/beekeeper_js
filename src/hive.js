var Entity = require("./entity.js");
var Textures = require("./textures.js");
var Sprite = require("./sprite.js");

module.exports = {

    new: function (children, parent) {

        // private data
        var textures = Textures.load();
        var sprite = Sprite.new("images/hive.png");

        // inherit from Entity
        var self = Entity.new(children, parent);

        // overrides 
        self.update = function (deltaTime) {
            var movement = {
                x: 0.0,
                y: 0.0
            };
            if (this.movingUp)
                movement.y -= 1.0 * deltaTime;
            if (this.movingDown)
                movement.y += 1.0 * deltaTime;
            if (this.movingLeft)
                movement.x -= 1.0 * deltaTime;
            if (this.movingRight)
                movement.x += 1.0 * deltaTime;
           this.move(movement);
        };

        self.render = function (canvas) {
            canvas.drawImage(
                sprite,
                this.getPosition().x,
                this.getPosition().y
            );
        };
        return self;

    }

};
