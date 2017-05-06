/*
 * Initializes stuff for the Game state and manages the scene graph,
 * which passes commands, deltaTime and context to all of its scene nodes
 * and their descendents.
 */

var SceneNode = require("./scene_node.js");

var World = function(context, level) {

    var canvas = context.canvas;
    var commandQueue = context.commandQueue;
    var sceneGraph = SceneNode();
    level.buildScene(sceneGraph);

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

