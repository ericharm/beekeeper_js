module.exports = {

    new: function (children, parent) {

        // private data
        children = children || [];
        parent = parent || null;

        // private methods
        function renderCurrent(canvas) {
            // do nothing by default
        }

        function renderChildren(canvas) {
            for (var i = 0; i < children.length; i++) {
                children[i].render(canvas);
            }
        }

        function updateCurrent(deltaTime) {
            // do nothing by default;
        }

        function updateChildren(deltaTime) {
            for (var i = 0; i < children.length; i++) {
                children[i].update(deltaTime);
            }
        }

        // public interface
        var self = {
            update: function (deltaTime) {
                updateCurrent(deltaTime);
                updateChildren(deltaTime);
            },
            render: function (canvas) {
                renderCurrent(canvas);
                renderChildren(canvas);
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
