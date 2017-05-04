var Entity = require("../../lib/entity.js");
var Textures = require("../../config/textures.js");
var Renderer = require("../../views/BeekeeperRenderer.js");
var Sprite = Textures.Sprite;

var Beekeeper = Entity.subclass(function (prototype, _, _protected) {

    prototype.init = function (children, options) {
        options = options ? options : {};
        _(this).renderer = Renderer({
            sprite: Sprite(Textures.beekeeper),
            spriteDescriptor: Textures.beekeeperDescriptor,
        });
        _(this).spriteState = "alien";
        // is there a better way to do this?
        _(this).self = this;
        prototype.super.init.call(this, children, options);
        _(this).categories = ['beekeeper'];
    };


    prototype.setMoving = function (direction, value) {
        // _(this).spriteState = direction;
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

    _protected.renderCurrent = function (canvas) {
        this.renderer.render(canvas, this.position, this.spriteState);
    };

    _protected.updateCurrent = function (deltaTime) {
        var movement = {
            x: 0.0,
            y: 0.0
        };
        if (this.movingUp)
            movement.y -= this.velocity.y * deltaTime;
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

