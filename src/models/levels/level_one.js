var SceneNode = require("../../lib/scene_node.js");
var Beekeeper = require("../entities/beekeeper.js");
var Hive      = require("../entities/hive.js");
var CollisionController = require("../../controllers/collision_controller.js");
// This could go straight into the beekeeper module
var HealthBar = require("../ui/health_bar.js");

var LevelOne = function () {

    // objects for the level
    var hive = Hive(function (self) {
        self._position = {x: 200, y: 300};
    });

    var beekeeper = Beekeeper(function (self) {
        self._position = {x: 100, y: 300};
        self._velocity = {x: 2, y: 2};
        self._startingHealth(100);
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
        self._categories.push('foreground');
    });

    var self = {
        handleCollisions: function (collidingPairs, commandQueue) {
            CollisionController.handleCollisions(collidingPairs, commandQueue);
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

