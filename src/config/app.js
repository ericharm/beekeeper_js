/*
 * Any application-wide variables
 */

Config = {

    frameRate: 30.0,
    canvasWidth: 800,
    canvasHeight: 600,
    initialState: require("../models/states/title_screen.js"),

    beekeeper: {
        harvestRate: 10
    }

};

module.exports = Config;

