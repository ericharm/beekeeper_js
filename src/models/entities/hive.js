var Entity = require("../../lib/entity.js");
var Textures = require("../../config/textures.js");
var Sprite = Textures.Sprite;

var Hive = function (callback) {

    var extended = {
        // protected
        _sprite: Sprite(Textures.hive),
        _categories: ['hive'],
    };

    // extends Entity
    self = Entity();
    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    if (callback) callback(self);
    return self;
};

module.exports = Hive;

