/*
 * A common type of scene node that has a position, velocity,
 * and a sprite, able to move an image file around the scene.
 */

var SceneNode = require("./scene_node.js");

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
        getCenter: function () {
            return {
                x: this._position.x + (this._width / 2),
                y: this._position.y + (this._height / 2)
            };
        },
        isRigid: function () {
            return this._rigid;
        },

        // protected
        _position: {x: 0, y: 0},
        _velocity: {x: 0, y: 0},
        _height: 0,
        _width: 0,
        _sprite: null,
        _rigid: true,
        _debug: false,

        _updateCurrent: function (deltaTime) {
            movement = {    
                x: this._velocity.x * deltaTime,
                y: this._velocity.y * deltaTime
            };
            this.move(movement);
        },

        _renderCurrent: function (canvas) {
            canvas.drawImage(this._sprite, this._position.x, this._position.y);
            if (this._debug) {
                var hitBox = this.hitBox();
                hitBox.render(canvas);
            }
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

