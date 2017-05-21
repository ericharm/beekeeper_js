var Config   = require("../../config/app.js");
var Entity   = require("../../lib/entity.js");
var SmokeShot = require("./smoke_shot.js");
var Renderer = require("../../views/beekeeper_renderer.js");
var GameOver = require("../states/game_over.js");

var Beekeeper = function (callback) {

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
                    timer.ms = Config.beekeeper.damageBuffer;
                });
            }
        },
        shootSmoke: function (deltaTime, position, commandQueue) {
            _this = this;
            if (_this._shotReady) {
                _this._shotReady = false;
                _this.timers.addTimer(function (timer) {
                    timer.onEnd = function () {
                        _this._shotReady = true;
                    };
                    timer.ms = 1000;
                });
                commandQueue.push(Command(function (node, deltaTime) {
                    var smokeShot = SmokeShot(function (that) {
                        that.setPosition({x: position.x, y: position.y});
                        that._debug = true;
                    });
                    node.attachChild(smokeShot);
                }, ['foreground']));
            }
        },
        pluck: function () {
            //so you can't keep gathering honey
            this._registersCollisions = false;
            for (var i = this._children.length - 1; i >= 0; i--) {
                // detach the health bar
                this.detachChild(this._children[i]);
            }
            _this = this;
            this.timers.addTimer(function (timer) {
                timer.onEnd = function () {
                    _this._context.stateStack.emptyStack();
                    _this._context.stateStack.push(GameOver(_this._context, _this._stats.honey));
                };
                timer.ms = 2000;
            });
        },
        // protected
        _width: Config.beekeeper.width,
        _height: Config.beekeeper.height,
        _renderer: Renderer(),
        _moveSpeed: Config.beekeeper.moveSpeed,
        _movingUp: false,
        _movingDown: false,
        _movingLeft: false,
        _movingRight: false,
        _invincible: false,
        _shotReady: true,

        _context: {},

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

