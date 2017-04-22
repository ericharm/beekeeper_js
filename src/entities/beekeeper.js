var Entity = require("../entity.js");
var Textures = require("../textures.js");
var Sprite = Textures.Sprite;

var Beekeeper = Entity.subclass(function (prototype, _, _protected) {

    prototype.init = function (children, options) {
        options = options ? options : {};
        options.sprite = Sprite.new(Textures.player);
        // is there a better way to do this?
        _(this).self = this;
        prototype.super.init.call(this, children, options);
        _(this).categories = ['beekeeper'];
    };

    prototype.setMoving = function (direction, value) {
        switch(direction) {
            case 'up':
                _(this).movingUp = value;
                break;
            case 'down':
                _(this).movingDown = value;
                break;
            case 'left':
                _(this).movingLeft = value;
                break;
            case 'right':
                _(this).movingRight = value;
                break;
        }
    };

    _protected.updateCurrent = function (deltaTime) {
        var movement = {
            x: 0.0,
            y: 0.0
        };
        if (this.movingUp) {
            movement.y -= this.velocity.y * deltaTime;
        }
        if (this.movingDown)
            movement.y += this.velocity.y * deltaTime;
        if (this.movingLeft)
            movement.x -= this.velocity.x * deltaTime;
        if (this.movingRight)
            movement.x += this.velocity.x * deltaTime;
        prototype.super.move.call(this.self, movement);
    };

});

module.exports = Beekeeper;

