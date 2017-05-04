/*
 * Initializes stuff for the Game state and manages the scene graph,
 * which passes commands, deltaTime and context to all of its scene nodes
 * and their descendents.
 */

// This may eventually be a template for creating Levels
// or substates of Game

var SceneNode = require("../lib/scene_node.js");
var Beekeeper = require("../models/entities/beekeeper.js");
var Hive = require("../models/entities/hive.js");
var BackgroundNode = SceneNode.subclass(function(prototype, _, _protected) {
    prototype.init = function () {
        prototype.super.init.call(this);
    };
    _protected.renderCurrent = function (canvas) {
        canvas.fillStyle = "#00aa00";
        canvas.fillRect(0, 0, 800, 600);
    };
});

var World = function(context) {
    // private data
    var beekeeper = new Beekeeper([], {
        position: {x: 100, y: 100}
    });
    var hive = new Hive([], {
        position: {x: 300, y: 300}
    });
    beekeeper.setVelocity({x: 2, y: 2});

    var canvas = context.canvas;
    var commandQueue = context.commandQueue;

    var sceneGraph = new SceneNode();
    var backgroundLayer = new SceneNode();
    var foregroundLayer = new SceneNode();

    var buildScene = function () {
        sceneGraph.attachChild(backgroundLayer);
        sceneGraph.attachChild(foregroundLayer);
        backgroundLayer.attachChild(new BackgroundNode());
        foregroundLayer.attachChild(beekeeper);
        foregroundLayer.attachChild(hive);
    };

    // initializer
    buildScene();

    var self = {
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

