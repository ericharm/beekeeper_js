BeekeeperRenderer = function (options) {

     var sprite =  options.sprite;
     var descriptor = options.spriteDescriptor;

    // var spriteStates = [ 'alien', 'climb1', 'climb2', 'duck', 'hurt', 'jump', 'stand', 'swim1', 'swim2', 'walk1', 'walk2' ];

    // currently states are named up down left right instead of what is in the descriptor
    // this is because state doesn't pick the sprite, state picks the strategy
    // strategy picks the sprite or set of sprites in the case of animation

     function animateBetween(sprites) {
        
     }

     var self = {

        render: function (canvas, position, spriteState) {
            // switch (spriteState) {
                // case 'up':
                    // animateBetween(['climb1', 'climb2']);
                    // break;
                // case 'down':
                    // break;
                // case 'left':
                    // break;
                // case 'right':
                    // break;
            // }

            // console.log(descriptor);
            
            // if (descriptor[spriteState]) {
                var currentSprite = descriptor[spriteState];
                canvas.drawImage(
                    sprite, currentSprite.x, currentSprite.y,
                    currentSprite.width, currentSprite.height,
                    position.x, position.y,
                    currentSprite.width, currentSprite.height
                );
            // }
        }
    };

    return self;

};

module.exports = BeekeeperRenderer;
