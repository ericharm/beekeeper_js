/*
 * A common type of scene node that has a position and velocity
 * and so can move around the screen.
 */

var SceneNode = require("./scene_node.js");

var Entity = SceneNode.subclass(function (prototype, _, _protected) {

    this.addGetters('position');
    this.addAccessors('velocity');

    prototype.init = function (children, options) {
        _(this).position = options.position ?
            options.position : {x: 0, y: 0};
        _(this).sprite = options.sprite;
        _(this).velocity = {x: 0, y: 0};
        _(this).movingUp = false;
        _(this).movingDown = false;
        _(this).movingLeft = false;
        _(this).movingRight = false;
        prototype.super.init.call(this, children);
    };

    prototype.move = function (movement) {
        _(this).position.x += movement.x;
        _(this).position.y += movement.y;
    };

    prototype.getVelocity = function () {
        return _(this).velocity;
    };

    _protected.updateCurrent = function (deltaTime) {
        movement = {    
            x: this.velocity.x * deltaTime,
            y: this.velocity.y * deltaTime
        };
        prototype.move.call(this, movement);
    };

    _protected.renderCurrent = function (canvas) {
        canvas.drawImage(this.sprite, this.position.x, this.position.y);
    };
}); 

module.exports = Entity;

