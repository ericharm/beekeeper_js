module.exports = {

    new: function (texture) {
        var image = new Image();
        image.src = texture;
        return image;
    }

};

