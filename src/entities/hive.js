var Entity = require("../entity.js");
var Textures = require("../textures.js");
var Sprite = Textures.Sprite;

module.exports = {

    new: function () {

        // inherit from Entity
        var self = Entity.new();
        
        // private data
        var sprite = Sprite.new(Textures.hive);
        var position = {x: 100, y: 100};

        // private overrides
        function renderCurrent(canvas) {
            canvas.drawImage(
                sprite,
                position.x,
                position.y
            );
        }

        // overrides 
        self.render = function (canvas) {
            renderCurrent(canvas);
        };
        return self;

    }

};
