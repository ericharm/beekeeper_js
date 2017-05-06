var Entity = require("../../lib/entity.js");
var Textures = require("../../config/textures.js");
var Sprite = Textures.Sprite;

var Beekeeper = function (callback) {

    // private
    // this might be moved into Entity protected
    var renderStates = {
        still: "alien"
    };

    var extended = {
        // public
        setMoving: function (direction, value) {
            switch(direction) {
                case 'up':
                    this._movingUp = value;
                    break;
                case 'down':
                    this._movingDown = value;
                    break;
                case 'left':
                    this._movingLeft = value;
                    break;
                case 'right':
                    this._movingRight = value;
                    break;

            }
        },
        
        // protected
        _width: 65,
        _height: 92,
        _sprite: Sprite(Textures.beekeeper),
        _spriteDescriptor: Textures.beekeeperDescriptor,
        _renderState: renderStates.still,
        _categories: ['beekeeper'],
        
        _movingUp: false,
        _movingDown: false,
        _movingLeft: false,
        _movingRight: false,

        _renderCurrent: function (canvas) {
            var currentSprite = this._spriteDescriptor[this._renderState];
            canvas.drawImage(
                this._sprite, currentSprite.x, currentSprite.y,
                currentSprite.width, currentSprite.height,
                this._position.x, this._position.y,
                currentSprite.width, currentSprite.height
            );
            var hitBox = this.hitBox();
            hitBox.render(canvas);
        },

        _updateCurrent: function (deltaTime) {
            var movement = {
                x: 0.0,
                y: 0.0
            };
            if (this._movingUp)
                movement.y -= this._velocity.y * deltaTime;
            if (this._movingDown)
                movement.y += this._velocity.y * deltaTime;
            if (this._movingLeft)
                movement.x -= this._velocity.x * deltaTime;
            if (this._movingRight)
                movement.x += this._velocity.x * deltaTime;
            this.move(movement);
        }

    };

    // extends Entity
    self = Entity();
    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    if (callback) callback(self);
    return self;
};

module.exports = Beekeeper;

