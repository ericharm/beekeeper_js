/*
 *  References to all sprite image
 *  paths and a little helper for
 *  creating Sprites.
 */

module.exports = {

    beekeeper: "images/alien2.png",
    beekeeperDescriptor: {
        "still": {
            "x": 52.5, "y": 71.25, "width": 48.75, "height": 69
        },
        "climb1": {
            "x": 52.5, "y": 0, "width": 48.75, "height": 71.25
        },
        "climb2": {
            "x": 100.5, "y": 221.25, "width": 48.75, "height": 71.25
        },
        "walk1": {
            "x": 0, "y": 220.5, "width": 51.0, "height": 69.75
        },
        "walk2": {
            "x": 0, "y": 147.0, "width": 51.75, "height": 73.5
        },
        "walk3": {
            "x": 0, "y": 75.0, "width": 51.0, "height": 72
        },
        "walk4": {
            "x": 0, "y": 0, "width": 51.0, "height": 72
        },
        "walk1mirror": {
            "x": 100.5, "y": 292.5, "width": 51.0, "height": 72
        },
        "walk2mirror": {
            "x": 100.5, "y": 147.0, "width": 51.75, "height": 73.5
        },
        "walk3mirror": {
            "x": 101.25, "y": 75, "width": 51.0, "height": 72
        },
        "walk4mirror": {
            "x": 101.25, "y": 0, "width": 51.0, "height": 72
        },
        "standleft": {
            "x": 51.0, "y": 221.25, "width": 49.5, "height": 72
        },
        "standright": {
            "x": 150, "y": 221.25, "width": 49.5, "height": 72
        }

    },


    hive: "images/hive.png",
    bee: "images/bee.png",

    Sprite: function (texture) {
        var image = new Image();
        image.src = texture;
        return image;
    },

};

