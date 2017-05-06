/*
* Scene Nodes and entities utilize the Mozart (https://github.com/philipwalton/mozart)
* library to mimic classical inheritance in Javascript. Scene Nodes live on the
* scene graph.
*/

var SceneNode = function (callback) {

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
        },

        detachChild: function (node) {
            var index = this._children.indexOf(node);
            if (index >= 0) {
                this._children.splice(index, 1);
            }
            else {
                throw 'NoChildError';
            }
        },

      // protected
        _children: [],
        _categories: [],

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

    // private
    function haveCommonCategories(first, second) {
        var arrays = [first, second];
        var result = arrays.shift().filter(function(v) {
            return arrays.every(function(a) {
                return (a.indexOf(v) !== -1);
            });
        });
        return result.length > 0;
    }

    if (callback) callback(self);
    return self;

};

module.exports = SceneNode;

