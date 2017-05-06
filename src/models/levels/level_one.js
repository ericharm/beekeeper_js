var SceneNode = require("../../lib/scene_node.js");
var Beekeeper = require("../entities/beekeeper.js");
var Hive      = require("../entities/hive.js");

var LevelOne = function() {

    // objects for the level
    var beekeeper = Beekeeper(function (self) {
        self.setPosition({x: 100, y: 300});
        self.setVelocity({x: 2, y: 2});
    });

    var hive = Hive(function (self) {
        self.setPosition({x: 200, y: 300});
        self._debug = true;
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
            foregroundLayer.attachChild(beekeeper);
            foregroundLayer.attachChild(hive);
        }
    };

    return self;

};

module.exports = LevelOne;

