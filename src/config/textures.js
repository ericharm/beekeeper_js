/*
 *  References to all sprite image
 *  paths and a little helper for
 *  creating Sprites.
 */

module.exports = {

    beekeeper: "images/alien.png",
    beekeeperDescriptor: {
        "alien": {
            "x": 70, "y": 95, "width": 66, "height": 92    
        },
        "climb1": {
            "x": 70, "y": 0, "width": 66, "height": 95    
        },
        "climb2": {
            "x": 134, "y": 289, "width": 66, "height": 95
        },
        "duck": {
            "x": 67, "y": 387, "width": 67, "height": 72
        },
        "hurt": {
            "x": 0, "y": 387, "width": 67, "height": 92
        },
        "jump": {
            "x": 69, "y": 196, "width": 66, "height": 93
        },
        "stand": {
            "x": 68, "y": 294, "width": 66, "height": 92
        },
        "swim1": {
            "x": 0, "y": 196, "width": 69, "height": 98
        },
        "swim2": {
            "x": 60, "y": 0, "width": 70, "height": 100
        },
        "walk1": {
            "x": 0, "y": 294, "width": 68, "height": 93
        },
        "walk2": {
            "x": 0, "y": 0, "width": 70, "height": 96
        }
    },

    hive: "images/hive.png",
    bee: "images/bee.png",

    Sprite: function (texture) {
        var image = new Image();
        image.src = texture;
        return image;
    }

};

