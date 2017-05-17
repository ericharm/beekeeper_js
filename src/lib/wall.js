var Entity = require("./entity.js");
var Config = require("../config/app.js");
//var Command = require("./command.js");

var Wall = function (callback) {

    // extends Entity
    var self = Entity();

    var extended = {
        _invisible: true,
        _renderCurrent: function (canvas) {
            if (!this._invisible) {
                canvas.fillStyle = "#000000";
                canvas.fillRect(
                    this._position.x, this._position.y,
                    this._width, this._height
                );
            }
        }
    };

    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._categories.push('wall');

    if (callback) callback(self);

    return self;
};

module.exports = Wall;

