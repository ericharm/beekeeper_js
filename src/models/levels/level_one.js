var SceneNode = require("../../lib/scene_node.js");
var Beekeeper = require("../entities/beekeeper.js");
var Hive      = require("../entities/hive.js");
var CollisionController = require("../../controllers/collision_controller.js");
// This could go straight into the beekeeper module
var Label = require("../ui/label.js");
var HealthBar = require("../ui/health_bar.js");

var LevelOne = function () {

    // entities
    var hive = Hive(function (self) {
        self._position = {x: 200, y: 300};
    });

    var beekeeper = Beekeeper(function (self) {
        self._position = {x: 250, y: 300};
        self._velocity = {x: 2, y: 2};
        self._startingHealth(100);
    });

    // ui
    var healthBar = HealthBar(function (self) {
        self._entity = beekeeper;
    });

    var hiveLabel = Label(function (self) {
        self._entity = hive;
        self._entity.modifyStat('honey', 100);
        self._statName = 'honey';
    });

    //turn this into a honey pot
    var beekeeperLabel = Label(function (self) {
        self._entity = beekeeper;
        self._entity.modifyStat('honey', 0);
        self._statName = 'honey';
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
            beekeeper.attachChild(beekeeperLabel);
            hive.attachChild(hiveLabel);
        }
    };

    return self;

};

module.exports = LevelOne;

