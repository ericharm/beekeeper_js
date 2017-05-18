var Config   = require("../../config/app.js");
var Entity   = require("../../lib/entity.js");
var SmokeShot = require("./smoke_shot.js");
var Renderer = require("../../views/beekeeper_renderer.js");
var Beekeeper = function (callback) {

    // private
    // this might be moved into Entity protected
    var renderStates = {
        still: "alien"
    };

    var self = Entity();

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
        pushBack: function (deltaTime) {
            var movement = {
                x: 0.0,
                y: 0.0
            };
            if (this._movingUp)
                movement.y += this._moveSpeed.y * deltaTime;
            if (this._movingDown)
                movement.y -= this._moveSpeed.y * deltaTime;
            if (this._movingLeft)
                movement.x += this._moveSpeed.x * deltaTime;
            if (this._movingRight)
                movement.x -= this._moveSpeed.x * deltaTime;
            this.move(movement);
        },
        harvest: function (hive, amount) {
            var honeyLeft = hive.getStats().honey;
            if (honeyLeft > amount) {
                this._stats.honey += amount;
                hive.modifyStat('honey', amount * -1);
            } else {
                this._stats.honey += honeyLeft;
                hive.modifyStat('honey', honeyLeft * -1);
            }
        },
        damage: function (amount) {
            //this can be moved to entity
            if (!this._invincible) {
                var that = this;
                that._stats.currentHealth -= amount * (1);
                this.timers.addTimer(function (timer) {
                    timer.onStart = function () {
                        that._invincible = true;
                    };
                    timer.onEnd = function () {
                        that._invincible = false;
                    };
                    timer.ms = 1000;
                });
            }
        },
        shootSmoke: function (deltaTime, position, commandQueue) {
            commandQueue.push(Command(function (node, deltaTime) {
                var smokeShot = SmokeShot(function (that) {
                    that.setPosition({x: position.x, y: position.y});
                    that._debug = true;
                });
                node.attachChild(smokeShot);
            }, ['foreground']));
        },

        // protected
        _width: 65,
        _height: 92,

        //_renderState: renderStates.still,
        _renderer: Renderer(),
        _moveSpeed: Config.beekeeper.moveSpeed,
        _movingUp: false,
        _movingDown: false,
        _movingLeft: false,
        _movingRight: false,
        _invincible: false,

        _renderCurrent: function (canvas) {
            var that = this;
            this._renderer.render(canvas, {
                velocity: that._velocity,
                position: that._position,
            });
        },

        _updateCurrent: function (deltaTime) {
            this._velocity = {x: 0, y: 0};
            if (this._movingUp)
                this._velocity.y -= this._moveSpeed.y;
            if (this._movingDown)
                this._velocity.y += this._moveSpeed.y;
            if (this._movingLeft)
                this._velocity.x -= this._moveSpeed.x;
            if (this._movingRight)
                this._velocity.x += this._moveSpeed.x;
            if (this._velocity.x !== 0 && this._velocity.y !== 0) {
                  this._velocity.x /= Math.sqrt(2);
                  this._velocity.y /= Math.sqrt(2);
            }
            self._superUpdate.call(this, deltaTime);
        }

    };

    // extends Entity
    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._stats.honey = 0;
    self._categories.push('beekeeper');

    if (callback) callback(self);
    return self;
};

module.exports = Beekeeper;

