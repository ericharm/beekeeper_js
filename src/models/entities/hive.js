var Entity = require("../../lib/entity.js");
var Command = require("../../lib/command.js");
var Textures = require("../../config/textures.js");
var Bee = require("./bee.js");
var Sprite = Textures.Sprite;

var Hive = function (callback) {

    // extends Entity
    self = Entity();

    var extended = {
        // public
        shootBee: function (deltaTime, position, commandQueue) {
            commandQueue.push(Command.new(function (node, deltaTime) {
                var bee = Bee(function (that) {
                    that.setPosition({x: position.x, y: position.y});
                    that.setVelocity({x: 3, y: 0});
                });
                node.attachChild(bee);
            }, ['foreground']));
        },
        // protected
        _width: 32,
        _height: 32,
        _sprite: Sprite(Textures.hive)
    };


    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._categories.push('hive');

    if (callback) callback(self);

    return self;
};

module.exports = Hive;

