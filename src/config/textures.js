/*
 *  References to all sprite image
 *  paths and a little helper for
 *  creating Sprites.
 */

module.exports = {

    beekeeper: "images/alien2.png",
    beekeeperDescriptor: {
        "still": {
            "x": 70, "y": 95, "width": 65, "height": 92
        },
        "climb1": {
            "x": 70, "y": 0, "width": 65, "height": 95
        },
        "climb2": {
            "x": 134, "y": 295, "width": 65, "height": 95
        },
        "walk1": {
            "x": 0, "y": 294, "width": 68, "height": 93
        },
        "walk2": {
            "x": 0, "y": 196, "width": 69, "height": 98
        },
        "walk3": {
            "x": 0, "y": 100, "width": 68, "height": 96
        },
        "walk4": {
            "x": 0, "y": 0, "width": 68, "height": 96
        },
        "walk1mirror": {
            "x": 134, "y": 390, "width": 68, "height": 96
        },
        "walk2mirror": {
            "x": 134, "y": 196, "width": 69, "height": 98
        },
        "walk3mirror": {
            "x": 135, "y": 100, "width": 68, "height": 96
        },
        "walk4mirror": {
            "x": 135, "y": 0, "width": 68, "height": 96
        },
        "standleft": {
            "x": 68, "y": 295, "width": 66, "height": 96
        },
        "standright": {
            "x": 200, "y": 295, "width": 66, "height": 96
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

