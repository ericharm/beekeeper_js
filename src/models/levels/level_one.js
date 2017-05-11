var SceneNode = require("../../lib/scene_node.js");
var Beekeeper = require("../entities/beekeeper.js");
var Hive      = require("../entities/hive.js");

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

    // all levels need to have a buildScene method
    var self = {
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

