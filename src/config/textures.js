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

        //"still": {
            //"x": 70, "y": 95, "width": 65, "height": 92
        //},
        //"climb1": {
            //"x": 70, "y": 0, "width": 65, "height": 95
        //},
        //"climb2": {
            //"x": 134, "y": 295, "width": 65, "height": 95
        //},
        //"walk1": {
            //"x": 0, "y": 294, "width": 68, "height": 93
        //},
        //"walk2": {
            //"x": 0, "y": 196, "width": 69, "height": 98
        //},
        //"walk3": {
            //"x": 0, "y": 100, "width": 68, "height": 96
        //},
        //"walk4": {
            //"x": 0, "y": 0, "width": 68, "height": 96
        //},
        //"walk1mirror": {
            //"x": 134, "y": 390, "width": 68, "height": 96
        //},
        //"walk2mirror": {
            //"x": 134, "y": 196, "width": 69, "height": 98
        //},
        //"walk3mirror": {
            //"x": 135, "y": 100, "width": 68, "height": 96
        //},
        //"walk4mirror": {
            //"x": 135, "y": 0, "width": 68, "height": 96
        //},
        //"standleft": {
            //"x": 68, "y": 295, "width": 66, "height": 96
        //},
        //"standright": {
            //"x": 200, "y": 295, "width": 66, "height": 96
        //}
    },


    hive: "images/hive.png",
    bee: "images/bee.png",

    Sprite: function (texture) {
        var image = new Image();
        image.src = texture;
        return image;
    },

};

