module.exports = {

    new: function (children, parent) {

        // private data
        children = children || [];
        parent = parent || null;

        // private methods
        function render(canvas) {
            // states.transform *= getTransform();
            drawCurrent(canvas);
            drawChildren(canvas);
        }

        function drawCurrent(canvas) {
            // do nothing by default
        }

        function drawChildren(canvas) {
            for (var i = 0; i < children.length; i++) {
                children[i].render();
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
            attachChild: function (child) {
                children.push(child);
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
