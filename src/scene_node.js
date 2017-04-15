var construct = require("mozart");

var SceneNode = construct(function (prototype, _, _protected) {

        prototype.init = function (children) {
        _(this).children = children || [];
        };

        prototype.update = function (deltaTime) {
        _(this).updateCurrent(deltaTime);
        _(this).updateChildren(deltaTime);
        };

        prototype.render = function (canvas) {
        _(this).renderCurrent(canvas);
        _(this).renderChildren(canvas);
        };

        prototype.attachChild = function (node) {
        _(this).children.push(node);
        };

        prototype.detachChild = function (node) {
            var index = _(this).children.indexOf(node);
            if (index >= 0) {
                _(this).children.splice(index, 1);
            }
            else {
                throw 'NoChildError';
            }
        };

        _protected.updateCurrent = function (deltaTime) {
            // do nothing by default
        };
        _protected.renderCurrent = function (canvas) {
            // do nothing by default
        };
        _protected.updateChildren = function (deltaTime) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].update(deltaTime);
            }
        };
        _protected.renderChildren = function (canvas) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].render(canvas);
            }
        };


});

module.exports = SceneNode;

