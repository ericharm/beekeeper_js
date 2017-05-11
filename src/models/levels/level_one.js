var SceneNode = require("../../lib/scene_node.js");
// won't be needed once a controller is handling collision
var Command   = require("../../lib/command.js");
var Beekeeper = require("../entities/beekeeper.js");
var Hive      = require("../entities/hive.js");
// This could go straight into the beekeeper module
var HealthBar = require("../ui/health_bar.js");


var LevelOne = function() {

    // objects for the level
    var hive = Hive(function (self) {
        self._position = {x: 200, y: 300};
    });

    var beekeeper = Beekeeper(function (self) {
        self._position = {x: 100, y: 300};
        self._velocity = {x: 2, y: 2};
    });

    // This could go straight into the beekeeper module
    var healthBar = HealthBar(function (self) {
        self._entity = beekeeper;
    });

    // layers
    var backgroundLayer = SceneNode(function (self) {
        self._renderCurrent = function (canvas) {
            canvas.fillStyle = "#00aa00";
            canvas.fillRect(0, 0, 800, 600);
        };
    });

    var foregroundLayer = SceneNode(function (self) {
        self._categories = ['foreground'];
    });

    //private
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

    var damageNode = function (node, deltaTime) {
        node._hitPoints = 0.5;
    };

    var self = {
        // this along with matchesCategories could be in a controller
        handleCollisions: function (collidingPairs, commandQueue) {
            for (var i = 0; i < collidingPairs.length; i++) {
                if (matchesCategories(collidingPairs[i], "beekeeper", "bee")) {
                    commandQueue.push(Command.new(damageNode, ["beekeeper"]));
                }
            }
        },

        buildScene: function (sceneGraph) {
            sceneGraph.attachChild(backgroundLayer);
            sceneGraph.attachChild(foregroundLayer);
            foregroundLayer.attachChild(hive);
            foregroundLayer.attachChild(beekeeper);
            beekeeper.attachChild(healthBar);
        }
    };

    return self;

};

module.exports = LevelOne;

