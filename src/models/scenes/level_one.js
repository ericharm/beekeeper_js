var SceneNode = require("../../lib/scene_node.js");
var Beekeeper = require("../entities/beekeeper.js");
var Hive      = require("../entities/hive.js");
var Wall      = require("../../lib/wall.js");
//var Config    = require("../../config/app.js");
var CollisionController = require("../../controllers/collision_controller.js")();
var Label = require("../ui/label.js");
var HealthBar = require("../ui/health_bar.js");

var LevelOne = function () {

    // entities
    var hive = Hive(function (self) {
        self._position = {x: 200, y: 300};
    });

    var hive2 = Hive(function (self) {
        self._position = {x: 400, y: 200};
    });

    var beekeeper = Beekeeper(function (self) {
        self._position = {x: 250, y: 300};
        self._velocity = {x: 2, y: 2};
        self._startingHealth(100);
    });

    var leftWall = Wall(function (self) {
        self._position = {x: -10, y: 0};
        self._width = 10;
        self._height = Config.canvasHeight;
    });

    var rightWall = Wall(function (self) {
        self._position = {x: Config.canvasWidth, y: 0};
        self._width = 10;
        self._height = Config.canvasHeight;
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

    var hive2Label = Label(function (self) {
        self._entity = hive2;
        self._entity.modifyStat('honey', 120);
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
        // this could be handled by state instead of scene
        // scene preferably only deals with scene nodes
        handleCollisions: function (collidingPairs, commandQueue) {
            CollisionController.handleCollisions(collidingPairs, commandQueue);
        },
        buildScene: function (sceneGraph) {
            sceneGraph.attachChild(backgroundLayer);
            sceneGraph.attachChild(foregroundLayer);
            foregroundLayer.attachChild(hive);
            foregroundLayer.attachChild(hive2);
            foregroundLayer.attachChild(beekeeper);
            foregroundLayer.attachChild(leftWall);
            foregroundLayer.attachChild(rightWall);
            beekeeper.attachChild(healthBar);
            beekeeper.attachChild(beekeeperLabel);
            hive.attachChild(hiveLabel);
            hive2.attachChild(hive2Label);
        }
    };

    return self;

};

module.exports = LevelOne;

