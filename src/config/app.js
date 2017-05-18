/*
 * Any application-wide variables
 */

var Config = {

    frameRate: 30.0,
    canvasWidth: 800,
    canvasHeight: 600,

    beekeeper: {
        harvestRate: 4,
        moveSpeed: {x: 2, y: 2},
    },

    bees: {
        basePower: 15
    },

    hives: {
        width: 32,
        height: 32
    },

    labels: {
        textColor: "#efefef"
    },

    statBars: {
        height: 10
    }

};

module.exports = Config;

