/*
 * Scene Nodes live on the scene graph. Each scene node can
 * update, render, and handle input each tick based on the
 * deltaTime, canvas and commands passed from the scene graph
 * and controllers.
 */

var SceneNode = function (callback) {

    // private
    var colliding = function (nodeA, nodeB) {
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
        if (hitBox1.x > r2.x || hitBox2.x > r1.x) return false;
        if (hitBox1.y > r2.y || hitBox2.y > r1.y) return false;
        return true;
    };

    var haveCommonCategories = function (first, second) {
        var arrays = [first, second];
        var result = arrays.shift().filter(function(v) {
            return arrays.every(function(a) {
                return (a.indexOf(v) !== -1);
            });
        });
        return result.length > 0;
    };

    var self = {
        // public
        onCommand: function (command, deltaTime) {
            if (haveCommonCategories(command.categories, this._categories)) {
                command.action(this, deltaTime);
            }
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].onCommand(command, deltaTime);
            }
        },
        update: function (deltaTime) {
            this._updateCurrent(deltaTime);
            this._updateChildren(deltaTime);
        },
        render: function (canvas) {
            this._renderCurrent(canvas);
            this._renderChildren(canvas);
        },
        attachChild: function (node) {
            this._children.push(node);
            node._parent = this;
        },
        detachChild: function (node) {
            console.log(this._categories);
            var index = this._children.indexOf(node);
            if (index >= 0) {
                this._children.splice(index, 1);
            }
            else {
                throw "NoChildError";
            }
        },
        getChildren: function () {
            return this._children;
        },
        isRigid: function () {
            return this._rigid;
        },
        registersCollisions: function () {
            return this._registersCollisions;
        },
        getCategories: function () {
            return this._categories;
        },

        checkNodesForCollision: function (node, collidingPairs) {
            if (this.registersCollisions() && node.registersCollisions()) {
                if (node !== this && colliding(this, node)) {
                    // should also test if collidingPairs contains
                    // [this, node] or [node, this]
                    collidingPairs.push([this, node]);
                }
            }
        },
        checkSceneCollision: function (sceneGraph, collidingPairs) {
            this.checkNodesForCollision(sceneGraph, collidingPairs);
            for (var i = 0; i < sceneGraph.getChildren().length; i++) {
                sceneGraph.getChildren()[i].checkSceneCollision(this, collidingPairs);
            }
        },
        pluck: function () {
            this._parent.detachChild(this);
        },
        outOfBounds: function () {
            return (this._position.x > Config.canvasWidth || this._position.x < 0 ||
                    this._position.y > Config.canvasHeight || this._position.y < 0);
        },

        // protected
        _position: {x: 0, y: 0},
        _children: [],
        _parent: null,
        _categories: [],
        _rigid: false,
        _registersCollisions: false,

        _updateCurrent: function (deltaTime) {
            // do nothing by default
        },

        _renderCurrent: function (canvas) {
            // do nothing by default
        },

        _updateChildren: function (deltaTime) {
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].update(deltaTime);
            }
        },

        _renderChildren: function (canvas) {
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].render(canvas);
            }
        }
    };

    if (callback) callback(self);
    return self;

};

module.exports = SceneNode;

