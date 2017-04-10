var SceneNode = require("./scene_node.js");
var BackgroundNode = require("./background_node.js");
var Hive = require("./hive.js");

module.exports = {

    new: function (context) {

        // private data
        var background = BackgroundNode.new();
        var player = context.player;
        var canvas = context.canvas;

        var sceneGraph = {
            layers: {
                background: SceneNode.new(),
                foreground: SceneNode.new()
            },
            update: function (deltaTime) {
                this.layers.background.update(deltaTime);
                this.layers.foreground.update(deltaTime);
            },
            render: function (canvas) {
                this.layers.background.render(canvas);
                this.layers.foreground.render(canvas);
            }

        };

        // initializer
        buildScene();

        // private methods
        function buildScene() {
            sceneGraph.layers.background.attachChild(background);
            sceneGraph.layers.foreground.attachChild(player);
        }

        var self = {
            update: function (deltaTime) {
                sceneGraph.update(deltaTime);
            },
            render: function () {
                sceneGraph.render(canvas);
            }
        };

        return self;
    }

};

