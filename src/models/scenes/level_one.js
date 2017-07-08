var Config    = require("../../config/app.js");
var Chance    = require("../../lib/chance.js");
var SceneNode = require("../../lib/scene_node.js");
var Wall      = require("../../lib/wall.js");
var Beekeeper = require("../entities/beekeeper.js");
var Hive      = require("../entities/hive.js");

var SmokeShot      = require("../entities/smoke_shot.js");

var CollisionController = require("../../controllers/collision_controller.js")();
var Label = require("../ui/label.js");
var HealthBar = require("../ui/health_bar.js");

var LevelOne = function (context) {

    var commandQueue = context.commandQueue;

    // entities
    var beekeeper = Beekeeper(function (self) {
        self._position = {x: 250, y: 300};
        self._startingHealth(Config.beekeeper.startingHealth);
        self._context = context;
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
            canvas.fillRect(0, 0, Config.canvasWidth, Config.canvasHeight);
        };
    });

    var foregroundLayer = SceneNode(function (self) {
        self._categories.push('foreground');
        self.createHive = function () {
            var hiveX = Chance.roll(Config.canvasWidth);
            var hiveY = Chance.roll(Config.canvasHeight);
            var _hive = Hive(function (_self) {
                _self._position = {x: hiveX, y: hiveY};
                _self._commandQueue = commandQueue;
            });
            var hiveHoney = Chance.roll(Config.hives.maxHoney);
            var hiveLabel = Label(function (_self) {
                _self._entity = _hive;
                _self._entity.modifyStat('honey', hiveHoney);
                _self._statName = 'honey';
            });
            _hive.attachChild(hiveLabel);
            self.attachChild(_hive);
        };
    });

    var topLayer = SceneNode(function (layer) {
        layer._categories.push('top');
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
            sceneGraph.attachChild(topLayer);
            topLayer.attachChild(beekeeper);
            foregroundLayer.attachChild(leftWall);
            foregroundLayer.attachChild(rightWall);
            beekeeper.attachChild(healthBar);
            beekeeper.attachChild(beekeeperLabel);
        }
    };

    return self;

};

module.exports = LevelOne;

