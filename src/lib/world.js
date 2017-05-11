/*
 * Manages a scene graph for any state that requires one, passing
 * commands, deltaTime and context to all of the nodes and checking
 * for collisions between all collidable nodes.
 */

var SceneNode = require("./scene_node.js");

var World = function(context, state) {

    var canvas = context.canvas;
    var commandQueue = context.commandQueue;

    var sceneGraph = SceneNode();

    state.buildScene(sceneGraph);

    var self = {
        update: function (deltaTime) {
            while (commandQueue.length > 0) {
                sceneGraph.onCommand(commandQueue.shift(), deltaTime);
            }
            sceneGraph.update(deltaTime);
            handleCollisions();
        },
        render: function () {
            sceneGraph.render(canvas);
        }
    };

    function handleCollisions() {
        collidingPairs = [];
        sceneGraph.checkSceneCollision(sceneGraph, collidingPairs);
        state.handleCollisions(collidingPairs, commandQueue);
    }

    return self;

};

module.exports = World;

