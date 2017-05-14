var Entity = require("../../lib/entity.js");
var Textures = require("../../config/textures.js");
var Sprite = Textures.Sprite;

var Bee = function (callback) {

    var extended = {
        // protected
        _width: 28,
        _height: 19,
        _sprite: Sprite(Textures.bee),

        _renderCurrent: function (canvas) {
            canvas.drawImage(
                this._sprite, 0, 0,
                112, 76,
                this._position.x, this._position.y,
                this._width, this._height
            );
        },
    };

    // extends Entity
    var self = Entity();
    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._categories.push('bee', 'world-bound');

    if (callback) callback(self);
    return self;
};

module.exports = Bee;

