/*
 * Initializes stuff for the Game state and manages the scene graph,
 * which passes commands, deltaTime and context to all of its scene nodes
 * and their descendants.
 */

var SceneNode = require("./scene_node.js");

// this has to happen somewhere else
var Command = require("./command.js");

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
            handleCollisions();
        },
        render: function () {
            sceneGraph.render(canvas);
        }
    };

    function handleCollisions() {
        collidingPairs = [];
        sceneGraph.checkSceneCollision(sceneGraph, collidingPairs);

        // this is application specific and should pull this file
        // out of the lib folder - should move to a collision controller?
        for (var i = 0; i < collidingPairs.length; i++) {
            if (matchesCategories(collidingPairs[i], "beekeeper", "bee")) {
                commandQueue.push(Command.new(function (node, deltaTime) {
                    // should be an accessor instead
                    node._hitPoints = 0.5;
                }, ["beekeeper"]));
            }
        }
    }

    function matchesCategories(nodePair, type1, type2) {

        var categories1 = nodePair[0].getCategories();
        var categories2 = nodePair[1].getCategories();

        //this will match twice if you pass it the same argument
        //for both types
        if (categories1.indexOf(type1) >= 0 && categories2.indexOf(type2) >= 0) {
            return true;
        } else {
            return false;
        }

    }

    return self;

};

module.exports = World;

