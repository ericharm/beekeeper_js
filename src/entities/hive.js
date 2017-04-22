var Entity = require("../entity.js");
var Textures = require("../textures.js");
var Sprite = Textures.Sprite;

var Hive = Entity.subclass(function (prototype, _, _protected) {
        
    prototype.init = function (children, options) {
        options = options ? options : {};
        options.sprite = Sprite.new(Textures.hive);
        
        prototype.super.init.call(this, children, options);
    };

});

module.exports = Hive;

