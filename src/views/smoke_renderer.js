var Config   = require("../config/app.js");
var Textures = require("../config/textures.js");
var Sprite   = Textures.Sprite;
var Animator = require("../lib/animator.js");

var SmokeRenderer = function () {

    var spriteSheet = Sprite(Textures.smoke);
    var descriptor  = Textures.smokeDescriptor;
    var animator = Animator(spriteSheet, descriptor);

    var self = {

        render: function (canvas, options) {
            var position = options.position;
            var currentSprite = descriptor.at0deg;

            animator.animate(canvas, {
                position: position,
                sprites: [
                    "at0deg", "at30deg", "at60deg", "at90deg",
                    "at120deg", "at150deg", "at180deg", "at210deg",
                    "at240deg", "at270deg", "at300deg", "at330deg",
                ],
                ms: 800
            });
        }
    };

    return self;

};

module.exports = SmokeRenderer;


