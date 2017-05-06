/*
 * Initializes stuff for the Game state and manages the scene graph,
 * which passes commands, deltaTime and context to all of its scene nodes
 * and their descendents.
 */

// This may eventually be a template for creating Levels
// or substates of Game

var SceneNode = require("../lib/scene_node.js");
var Beekeeper = require("../models/entities/beekeeper.js");
var Hive      = require("../models/entities/hive.js");

var backgroundLayer = SceneNode(function (self) {
    self._renderCurrent = function (canvas) {
        canvas.fillStyle = "#00aa00";
        canvas.fillRect(0, 0, 800, 600);
    };
});

var foregroundLayer = SceneNode(function (self) {
    self._categories = ['foreground'];
});

var World = function(context) {

    var beekeeper = Beekeeper(function (self) {
        self.setPosition({x: 100, y: 300});
        self.setVelocity({x: 2, y: 2});
    });

    var hive = Hive(function (self) {
        self.setPosition({x: 400, y: 300});
    });

    var canvas = context.canvas;
    var commandQueue = context.commandQueue;

    var sceneGraph = new SceneNode();

    var buildScene = function () {
        sceneGraph.attachChild(backgroundLayer);
        sceneGraph.attachChild(foregroundLayer);
        foregroundLayer.attachChild(beekeeper);
        foregroundLayer.attachChild(hive);
    };

    // initializer
    buildScene();

    var self = {
        // This update function is going to be used in every state
        // Maybe move up to an abstract class
        update: function (deltaTime) {
            while (commandQueue.length > 0) {
                sceneGraph.onCommand(commandQueue.shift(), deltaTime);
            }
            sceneGraph.update(deltaTime);
        },
        render: function () {
            sceneGraph.render(canvas);
        }
    };

    return self;
};

module.exports = World;

