module.exports = {

    player: "images/alien.png",
    hive: "images/hive.png",

    Sprite: {
        new: function (texture) {
            var image = new Image();
            image.src = texture;
            return image;
        }
    }

};

