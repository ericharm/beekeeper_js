var Entity = require("../../lib/entity.js");

HealthBar = function (callback) {

    // extends SceneNode
    var self = Entity();

    var extended = {

        // protected
        _entity: null,

        _renderCurrent: function (canvas) {
            var pos = self.getPosition.call(this);
            var size = this._entity.getSize();
            var health = this._entity.getHealth();
            var ratio = health.current / health.max;
            canvas.fillStyle = "#ffff00";
            canvas.fillRect(pos.x, pos.y + size.y, size.x * ratio, 10);
            canvas.strokeStyle = "#000000";
            canvas.strokeRect(pos.x, pos.y + size.y, size.x, 10);
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

module.exports = HealthBar;

