/*
 * Any application-wide variables
 */

var Config = {

    frameRate: 30.0,
    canvasWidth: 800,
    canvasHeight: 600,

    beekeeper: {
        startingHealth: 100,
        harvestRate: 4,
        moveSpeed: {x: 3.0, y: 3.0},
        damageBuffer: 1000,
        width: 65,
        height: 92
    },

    bees: {
        basePower: 15,
        moveSpeed: {x: 4.0, y: 4.0},
        waitTime: 1000,
        avgSpawnInterval: 3.0
    },

    hives: {
        width: 32,
        height: 32,
        moveSpeed: {x: 1.0, y: 1.0},
        avgSpawnInterval: 3.0,
        maxHoney: 300
    },

    labels: {
        textColor: "#efefef"
    },

    statBars: {
        height: 10
    }

};

module.exports = Config;

