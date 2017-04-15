var SceneNode = require("./scene_node.js");

var BackgroundNode = SceneNode.subclass(function(prototype, _, _protected) {

    prototype.init = function () {
        prototype.super.init.call(this);
    };

    _protected.renderCurrent = function (canvas) {
        // clear window
        canvas.fillStyle = "#00aa00";
        canvas.fillRect(0, 0, 800, 600);
        // draw border
        canvas.fillStyle = "#aaaaaa";
        canvas.strokeRect(0, 0, 800, 600);
    };

});

module.exports = {

    new: function (context) {

        // private data
        var hive = context.hive;
        var player = context.player;
        player.setVelocity({x: 2, y: 2});
        var canvas = context.canvas;

        var sceneGraph = {
            layers: {
                background: new SceneNode(),
                foreground: new SceneNode()
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
            sceneGraph.layers.background.attachChild(new BackgroundNode());
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

