var World   = require("../../lib/world.js");
var Command = require("../../lib/command.js");
var Chance  = require("../../lib/chance.js");
var Sound   = require("../../lib/sound.js");
var Audio   = require("../../config/audio.js");
var Config  = require("../../config/app.js");
var Player  = require("../../controllers/player.js");
var LevelOne = require("../scenes/level_one.js");

var Game = function (context) {

    // World object should manage commandQueue
    // and add it to context and pass it to game
    context.commandQueue = [];
    var scene = LevelOne(context);
    var world = World(context, scene);
    var player = Player(context);

    // fix the repetition between this and game over
    var stopAudio = function () {
        $("audio").each(function () {
            if ($(this).attr("loop")) this.pause();
        });
    };

    var self = {
        update: function (deltaTime) {
            world.update(deltaTime);

            var time = Config.frameRate * Config.hives.avgSpawnInterval;
            if (Chance.roll(time) === 1) {
                context.commandQueue.push(Command(function (node, deltaTime) {
                    node.createHive();
                }, ["foreground"]));
            }
            time = Config.frameRate * Config.shots.avgSpawnInterval;
            if (Chance.roll(time) === 1) {
                context.commandQueue.push(Command(function (node, deltaTime) {
                    node.dropShot();
                }, ["foreground"]));
            }
            time = Config.frameRate * Config.suits.avgSpawnInterval;
            if (Chance.roll(time) === 1) {
                context.commandQueue.push(Command(function (node, deltaTime) {
                    node.dropSuit();
                }, ["foreground"]));
            }
        },
        draw: function () {
            world.render();
        },
        processRealtimeInput: function (event, isKeyPressed) {
            player.processRealtimeInput(event, isKeyPressed);
        },
        processEvent: function (event) {
            player.processEvent(event);
        },
    };

    // this also kills the sound effect for selecting "Play"
    stopAudio();
    var gameMusic = Sound(Audio.gameMusic);
    gameMusic.play();
    return self;
};

module.exports = Game;

