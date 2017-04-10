var SceneNode = require("./scene_node.js");

module.exports = {

    new: function (children, parent) {

        // inherit from Entity
        var self = SceneNode.new(children, parent);

        // overrides 
        self.render = function (canvas) {
            // clear window
            canvas.fillStyle = "#00aa00";
            canvas.fillRect(0, 0, 800, 600);
            // draw background
            canvas.fillStyle = "#aaaaaa";
            canvas.strokeRect(0, 0, 800, 600);
        };
        return self;

    }

};
