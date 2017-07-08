var Config = require("../../config/app.js");
var Entity = require("../../lib/entity.js");

var StatBar = function (callback) {

    // extends SceneNode
    var self = Entity();

    var extended = {

        // protected
        _entity: null,
        _registersCollisions: false,
        _fillColor: "#ffff00",
        _offset: {
            x: 0,
            y: 0
        },
        _getMaxStat: function () {
            return this._entity.getHealth().max;
        },
        _getCurrentStat: function () {
            return this._entity.getHealth().current;
        },

        _renderCurrent: function (canvas) {
            var pos = self.getPosition.call(this);
            var size = this._entity.getSize();
            var ratio = this._getCurrentStat() / this._getMaxStat();
            canvas.fillStyle = this._fillColor;
            canvas.fillRect(
                pos.x + this._offset.x,
                pos.y + size.y + this._offset.y,
                size.x * ratio,
                Config.statBars.height
            );
            canvas.strokeStyle = "#000000";
            canvas.strokeRect(
                pos.x + this._offset.x,
                pos.y + size.y + this._offset.y,
                size.x,
                Config.statBars.height
            );
        },

        _updateCurrent: function () {
            self.setPosition.call(this, this._entity.getPosition());
        }
    };

    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    if (callback) callback(self);
    return self;

};

module.exports = StatBar;

