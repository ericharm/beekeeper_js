/*
 * A common type of scene node that has a position, velocity,
 * and a sprite, able to move an image file around the scene.
 */

var SceneNode = require("./scene_node.js");
var Timers = require("./timers.js");
var Config = require("../config/app.js");

var Entity = function (callback) {

    // public
    var extended = {

        move: function (vector) {
            this._position.x += vector.x;
            this._position.y += vector.y;
        },
        getPosition: function () {
            return this._position;
        },
        setPosition: function (position) {
            this._position = position;
        },
        getVelocity: function () {
            return this._velocity;
        },
        setVelocity: function (velocity) {
            this._velocity = velocity;
        },
        getSize: function () {
            return {
                x: this._width,
                y: this._height
            };
        },
        getCenter: function () {
            return {
                x: this._position.x + (this._width / 2),
                y: this._position.y + (this._height / 2)
            };
        },
        getStats: function () {
            return this._stats;
        },
        getHealth: function () {
            return {
                current: this._stats.currentHealth,
                max: this._stats.maxHealth
            };
        },
        modifyStat: function (statName, amount) {
            this._stats[statName] += amount;
            if (this._stats.currentHealth <= 0) {
                this._parent.detachChild(this);
            }
        },
        // isDead: function () {
            // return (this._stats.currentHealth <= 0);
        // },
        // Might someday get its own module
        hitBox: function () {
            var p = this._position;
            var w = this._width;
            var h = this._height;

            var bounds = {
                x: p.x + 2, y: p.y + 2,
                width: w - 4, height: h - 4
            };

            return {
                bounds: bounds,
                render: function (canvas) {
                    canvas.strokeStyle = "#000000";
                    canvas.strokeRect(
                        this.bounds.x, this.bounds.y,
                        this.bounds.width, this.bounds.height
                    );
                }
            };
        },
        timers: Timers(),

        // protected
        _velocity: {x: 0, y: 0},
        _height: 0,
        _width: 0,
        _sprite: null,
        // _rigid: true,
        _registersCollisions: true,
        _debug: false,
        _stats: {
            currentHealth: 1,
            maxHealth: 1
        },

        _superUpdate: function (deltaTime) {
            this.timers.update(deltaTime);
            if (this._stats.currentHealth <= 0) this.pluck();
            movement = {
                x: this._velocity.x * deltaTime,
                y: this._velocity.y * deltaTime
            };
            this.move(movement);
        },
        _updateCurrent: function (deltaTime) {
            this._superUpdate(deltaTime);
        },
        _renderCurrent: function (canvas) {
            canvas.drawImage(this._sprite, this._position.x, this._position.y);
            if (this._debug) {
                var hitBox = this.hitBox();
                hitBox.render(canvas);
            }
        },
        _startingHealth: function (hitPoints) {
            this._stats.currentHealth = hitPoints;
            this._stats.maxHealth = hitPoints;
        }

    };

    // extends SceneNode
    var self = SceneNode();
    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    if (callback) callback(self);
    return self;

};

module.exports = Entity;

