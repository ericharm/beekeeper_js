var Entity = require("../../lib/entity.js");
var Config = require("../../config/app.js");
var Textures = require("../../config/textures.js");
var Sprite = Textures.Sprite;

var Suit = function (callback) {

    // extends Entity
    var self = Entity();

    var extended = {

        // protected
        _width: Config.suits.width,
        _height: Config.suits.height,
        _sprite: Sprite(Textures.suit),
        _commandQueue: []

    };


    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._categories.push('suit');
    //self._debug = true;
    self.timers.addTimer(function (timer) {
        timer.onEnd = function () {
            self.pluck();
        };
        timer.ms = Config.suits.pickupTimeLimit;
    });

    if (callback) callback(self);

    return self;
};

module.exports = Suit;


