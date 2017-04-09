var SceneNode = require("./scene_node.js");

module.exports = {

    new: function (children, parent) {

        // inherit from SceneNode
        var self = SceneNode.new(children, parent);
        return self;

    }

};

