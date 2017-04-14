var SceneNode = require("./scene_node.js");

module.exports = {

    new: function (context) {

        // private data
        var background = SceneNode.new();
        background.render = function (canvas) {
            // clear window
            canvas.fillStyle = "#00aa00";
            canvas.fillRect(0, 0, 800, 600);
            // draw background
            canvas.fillStyle = "#aaaaaa";
            canvas.strokeRect(0, 0, 800, 600);
        };
        var hive = context.hive;
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

        // private methods
        var buildScene = function () {
            sceneGraph.layers.background.attachChild(background);
            sceneGraph.layers.foreground.attachChild(player);
            sceneGraph.layers.foreground.attachChild(hive);
        };
        
        // initializer
        buildScene();

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

