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
        collidesWith: function (node, collidingPairs) {
            // Can't collide with itself
            if (node === this) return false;
            return checkNodesForCollision(this, node, collidingPairs);
        },
        hitBox: function () {
            var hitBox = this._hitBox();
            return hitBox;
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
        },
        _hitBox: function () {
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
        }

    };

    // private
    function checkNodesForCollision(nodeA, nodeB, collidingPairs) {
        var hitBox1 = nodeA.hitBox().bounds;
        var hitBox2 = nodeB.hitBox().bounds;
        var r1 = {
            x: hitBox1.x + hitBox1.width,
            y: hitBox1.y + hitBox1.height          
        };
        var r2 = {
            x: hitBox2.x + hitBox2.width,
            y: hitBox2.y + hitBox2.height          
        };

        // If one rectangle is on left side of other
        if (hitBox1.x > r2.x || hitBox2.x > r1.x) return false;
        // If one rectangle is above other
        if (hitBox1.y > r2.y || hitBox2.y > r1.y) return false;

        if (collidingPairs) collidingPairs.push([nodeA, nodeB]);
        return true;
    }

    // extends SceneNode
    var self = SceneNode();
    for (var attribute in extended) { 
        self[attribute] = extended[attribute];
    }        

    if (callback) callback(self);
    return self;

};

module.exports = Entity;

