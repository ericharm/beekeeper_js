module.exports = {

    new: function (children, parent) {

        // private data
        children = children || [];
        parent = parent || null;

        // private methods
        function renderChildren(canvas) {
            for (var i = 0; i < children.length; i++) {
                children[i].render(canvas);
            }
        }

        function updateChildren(deltaTime) {
            for (var i = 0; i < children.length; i++) {
                children[i].update(deltaTime);
            }
        }

        // public interface
        var self = {
            update: function (deltaTime) {
                this.updateCurrent(deltaTime);
                updateChildren(deltaTime);
            },
            render: function (canvas) {
                this.renderCurrent(canvas);
                renderChildren(canvas);
            },
            updateCurrent: function (deltaTime) {
                // do nothing by default
            },
            renderCurrent: function (canvas) {
                // do nothing by default
            },
            attachChild: function (node) {
                children.push(node);
            },
            detachChild: function (node) {
                var index = children.indexOf(node);
                if (index >= 0) {
                    children.splice(index, 1);
                }
                else {
                    throw 'NoChildError';
                }
            }
        };
        return self;
    }
};

