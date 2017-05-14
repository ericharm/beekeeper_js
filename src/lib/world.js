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

    timers = {
        list: [],
        push: function (timer) {
            timer.container = this.list;
            this.list.push(timer);
        },
        update: function (deltaTime) {
            for (var timer = 0; timer < this.list.length; timer++) {
                this.list[timer].update(deltaTime);
            }
        }
    };

    //this should be in the context
    state.timers = timers;
    //this also should be in the context
    var sceneGraph = SceneNode();

    state.buildScene(sceneGraph);

    var self = {
        update: function (deltaTime) {
            /** Update any existing timers */
            timers.update(deltaTime);

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
        sceneGraph.checkSceneCollision(sceneGraph, collidingPairs);
        state.handleCollisions(collidingPairs, commandQueue);
    }

    return self;

};

module.exports = World;

