var Entity = require("../../lib/entity.js");
var Command = require("../../lib/command.js");
var Chance = require("../../lib/chance.js");
var Config = require("../../config/app.js");
var Textures = require("../../config/textures.js");
var Bee = require("./bee.js");
var Sprite = Textures.Sprite;

var Hive = function (callback) {

    // extends Entity
    var self = Entity();

    var extended = {

        // public
        shootBee: function (deltaTime, position, commandQueue) {
            var _this = this;
            commandQueue.push(Command(function (node, deltaTime) {
                _this.setTarget(node.getPosition());
            }, ['beekeeper']));
            commandQueue.push(Command(function (node, deltaTime) {
                var bee = Bee(function (that) {
                    that.setPosition(_this.getCenter());
                    that.setVelocity({
                        x: _this._shootVelocity.x * Config.bees.moveSpeed.x,
                        y: _this._shootVelocity.y * Config.bees.moveSpeed.y
                    });
                });
                node.attachChild(bee);
            }, ['foreground']));
        },
        setTarget: function (vector) {
            var vectorX = (vector.x - this._position.x);
            var vectorY = (vector.y - this._position.y);
            var distance = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
            this._shootVelocity = {
                x: vectorX / distance,
                y: vectorY / distance
            };
        },
        _updateCurrent: function (deltaTime) {
            var stats = self.getStats.call(this);
            if (stats.honey <= 0) self.pluck.call(this);
            var time = Config.frameRate * Config.bees.avgSpawnInterval;
            if (Chance.roll(time) === 1) {
                this.shootBee(deltaTime, this._position, this._commandQueue);
            }
        },
        // protected
        _width: Config.hives.width,
        _height: Config.hives.height,
        _sprite: Sprite(Textures.hive),
        _shootVelocity: {x: 0, y: 0},
        _commandQueue: []
    };


    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._stats.honey = 0;
    self._categories.push('hive');

    if (callback) callback(self);

    return self;
};

module.exports = Hive;

