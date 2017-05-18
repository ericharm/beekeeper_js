var Config = require("../config/app.js");

var Animator = function (spriteSheet, descriptor) {
    var _currentTick = 0;

    var self = {
        animate: function (canvas, options) {
            var position = options.position;
            var sprites = options.sprites;
            var ms = options.ms;

            if (_currentTick >= ms / Config.frameRate) {
                _currentTick = 0;
            }

            var totalTicks = ms / Config.frameRate;
            var ticksPerSprite = totalTicks / sprites.length;
            var currentSpriteIndex = Math.floor(_currentTick / ticksPerSprite);
            if (currentSpriteIndex > sprites.length) currentSpriteIndex -= 1;

            var currentSprite = descriptor[sprites[currentSpriteIndex]];
            canvas.drawImage(
                spriteSheet, currentSprite.x, currentSprite.y,
                currentSprite.width, currentSprite.height,
                position.x, position.y,
                currentSprite.width, currentSprite.height
            );
            _currentTick += 1;
        }
    };

    return self;
};

module.exports = Animator;

