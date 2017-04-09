var SceneNode = require("./scene_node.js");

module.exports = {

    new: function (context) {

        // private data
        var canvas = context.canvas;
        var textures = context.textures;
        var player = context.player;
        var sceneGraph = SceneNode.new();


        // private methods
        function loadTextures() {
        }

        function buildScene() {
        }

        var self = {
            update: function (deltaTime) {
            },
            render: function () {
            }
        };

        return self;
    }

};
