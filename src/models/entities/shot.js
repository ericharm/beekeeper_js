var Entity = require("../../lib/entity.js");
var Config = require("../../config/app.js");
var Textures = require("../../config/textures.js");
var Sprite = Textures.Sprite;

var Shot = function (callback) {

    // extends Entity
    var self = Entity();

    var extended = {

        // protected
        _width: Config.shots.width,
        _height: Config.shots.height,
        _sprite: Sprite(Textures.shot),
        _commandQueue: [],

        _renderCurrent: function (canvas) {
            canvas.drawImage(
                this._sprite, 0, 0,
                128, 128,
                this._position.x, this._position.y,
                this._width, this._height
            );
        },
    };


    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._categories.push('shot');
    self._debug = true;

    if (callback) callback(self);

    return self;
};

module.exports = Shot;

