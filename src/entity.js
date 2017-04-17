var SceneNode = require("./scene_node.js");
var construct = require("mozart");

var Entity = SceneNode.subclass(function (prototype, _, _protected) {

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

    // add dynamic getters
    prototype.getPosition = function () {
        return _(this).position;
    };

    // add dynamic accessors
    prototype.setVelocity = function (vector) {
        _(this).velocity = vector;
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

