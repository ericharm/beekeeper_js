var Config = require("../../config/app.js");
var Entity = require("../../lib/entity.js");

var Label = function (callback) {

    // extends SceneNode
    var self = Entity();

    var extended = {

        // protected
        _entity: null,
        _value: 0,
        _statName: '',
        _registersCollisions: false,

        _renderCurrent: function (canvas) {
            // Background
            canvas.fillStyle = Config.labels.textColor;
            var pos = self.getPosition.call(this);
            canvas.fillText(Math.round(this._value), this._position.x, this._position.y);
        },
        _updateCurrent: function () {
            //add an accessor to entity
            this._value = this._entity._stats[this._statName];
            self.setPosition.call(this, this._entity.getPosition());
        }

    };

    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    if (callback) callback(self);
    return self;

};

module.exports = Label;

