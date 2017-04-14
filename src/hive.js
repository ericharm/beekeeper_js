var Entity = require("./entity.js");
var Textures = require("./textures.js");
var Sprite = require("./sprite.js");

module.exports = {

    new: function (children, parent) {

        // inherit from Entity
        var self = Entity.new(children, parent);
        
        // private data
        var textures = Textures.load();
        var sprite = Sprite.new(textures.hive);
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
