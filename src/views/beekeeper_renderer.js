var Config   = require("../config/app.js");
var Textures = require("../config/textures.js");
var Sprite   = Textures.Sprite;
var Animator = require("../lib/animator.js");

BeekeeperRenderer = function () {

    var spriteSheet = Sprite(Textures.beekeeper);
    var descriptor  = Textures.beekeeperDescriptor;
    var animator = Animator(spriteSheet, descriptor);
    var moveSpeed = Config.beekeeper.moveSpeed;

    var self = {

        render: function (canvas, options) {
            var velocity = options.velocity;
            var position = options.position;
            var currentSprite = descriptor.still;
            if (velocity.x >= (moveSpeed.x / Math.sqrt(2))) {
                animator.animate(canvas, {
                    position: position,
                    sprites: ["walk1", "walk2", "walk3", "walk4"],
                    ms: 600
                });
            } else if (velocity.y == -(moveSpeed.y)) {
                animator.animate(canvas, {
                    position: position,
                    sprites: ["climb1", "climb2"],
                    ms: 300
                });
            } else if (velocity.x <= -(moveSpeed.x / Math.sqrt(2))){
                animator.animate(canvas, {
                    position: position,
                    sprites: [
                        "walk1mirror", "walk2mirror",
                        "walk3mirror", "walk4mirror"
                    ],
                    ms: 600
                });
            } else if (velocity.y == moveSpeed.y) {
                animator.animate(canvas, {
                    position: position,
                    sprites: [
                        "standleft", "still",
                        "standright", "still"
                    ],
                    ms: 600
                });
            } else {
                canvas.drawImage(
                    spriteSheet, currentSprite.x, currentSprite.y,
                    currentSprite.width, currentSprite.height,
                    position.x, position.y,
                    currentSprite.width, currentSprite.height
                );
            }
        }
    };

    return self;

};

module.exports = BeekeeperRenderer;

