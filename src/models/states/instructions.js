var Config = require("../../config/app.js");
var Keys = require("../../config/keys.js");
var Textures = require("../../config/textures.js");
var Sprite   = Textures.Sprite;

var Instructions = function (context) {

    var canvas = context.canvas;
    var shot = Sprite(Textures.shot);
    var suit = Sprite(Textures.suit);
    var bee = Sprite(Textures.bee);
    var hive = Sprite(Textures.hive);
    var smoke = Sprite(Textures.smoke);

    var addDescription = function (options) {
        canvas.drawImage(options.sprite, 10, options.y);
        canvas.fillText(options.description, 100, options.y + 30);
        canvas.fillText(options.line_two, 100, options.y + 50);
    };

    var self = {
        update: function (deltaTime) {
            //world.update(deltaTime);
        },
        draw: function (canvas) {
            canvas.fillStyle = "#aaaa33";
            canvas.fillText("Instructions", 300, 50);

            canvas.font = "16px PressStart";
            canvas.fillStyle = "#aaaaaa";

            addDescription({
                sprite: suit, y: 100, description: "Put on the suit and the next sting",
                line_two: "won't hurt you"
            });
            addDescription({
                sprite: shot, y: 200, description: "Pick up antibiotics to recover health",
                line_two: ""
            });
            addDescription({
                sprite: bee, y: 300, description: "Avoid bee stings or you'll pass out from",
                line_two: "allergic reaction!"
            });
            addDescription({
                sprite: hive, y: 400, description: "Walk into hives to gather honey",
                line_two: ""
            });
            addDescription({
                sprite: smoke, y: 500, description: "Press SPACE to use smoker -",
                line_two: "bees hate it!"
            });


        },
        processRealtimeInput: function (event, isKeyPressed) {
            //player.processRealtimeInput(event, isKeyPressed); 
        },
        processEvent: function (event) {
            if (event.keyCode === Keys.Enter) {
                var MainMenu = require("./main_menu.js");
                context.stateStack.pop();
                context.stateStack.push(MainMenu(context));
            }
        }
    };
    return self;
};

module.exports = Instructions;


