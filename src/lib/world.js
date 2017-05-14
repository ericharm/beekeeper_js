/*
 * Manages a scene graph for any state that requires one, passing
 * commands, deltaTime and context to all of the nodes and checking
 * for collisions between all collidable nodes.
 */

var SceneNode = require("./scene_node.js");
var Command = require("./command.js");

var World = function(context, state) {

    var canvas = context.canvas;
    var commandQueue = context.commandQueue;

    //this also should be in the context
    var sceneGraph = SceneNode();

    state.buildScene(sceneGraph);

    var self = {
        update: function (deltaTime) {
            /** Execute all queued commands */
            while (commandQueue.length > 0) {
                sceneGraph.onCommand(commandQueue.shift(), deltaTime);
            }

            /** Update all of the scene nodes */
            sceneGraph.update(deltaTime);
            handleCollisions();

            /** Remove out-of-bounds entites */
            commandQueue.push(Command.new(function (node, deltaTime) {
                if (node.outOfBounds()) {
                    node.pluck();
                }
            }, ['world-bound']));
        },
        render: function () {
            sceneGraph.render(canvas);
        }
    };

    function handleCollisions() {
        collidingPairs = [];
        collidingPairs.where = function (index, category) {
            var pair = collidingPairs[index];
            for (var node = 0; node < pair.length; node++) {
                if (pair[node].getCategories().indexOf(category) > -1) return pair[node];
            }
        };
        sceneGraph.checkSceneCollision(sceneGraph, collidingPairs);
        state.handleCollisions(collidingPairs, commandQueue);
    }

    return self;

};

module.exports = World;

