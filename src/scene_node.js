module.exports = {

    new: function () {
        // public interface
        var self = {
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
                var index = _children.indexOf(node);
                if (index >= 0) {
                    _children.splice(index, 1);
                }
                else {
                    throw 'NoChildError';
                }
            },
            // protected
            _children: [],
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
        return self;
    }
};

