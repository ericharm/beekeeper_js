var Entity = require("../../lib/entity.js");

var SmokeShot = function (callback) {

    // extends Entity
    var self = Entity();

    var extended = {
        // protected
        _width: 200,
        _height: 200,
        _renderCurrent: function (canvas) {
            var hitBox = this.hitBox();
            hitBox.render(canvas);
        },
        _updateCurrent: function (deltaTime) {
            var this_ = this;
            var parentCenter = this._parent.getCenter();
            var halves = {width: (this_._width / 2), height: (this_._height / 2)};
            var anchor = {
                x: parentCenter.x - halves.width,
                y: parentCenter.y - halves.height
            };
            var direction = this._getDirection(this._parent);
            var positionX = anchor.x + (direction.x * halves.width);
            var positionY = anchor.y + (direction.y * halves.height);
            this.setPosition({x: positionX, y: positionY});
        },
        _getDirection: function (parent) {
            var x = 0;
            var y = 0;
            if (parent._movingUp) y = -1;
            else if (parent._movingDown) y = 1;
            if (parent._movingLeft) x = -1;
            else if (parent._movingRight) x = 1;
            return {x: x, y: y};
        }
    };

    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._categories.push('smoke');

    if (callback) callback(self);

    return self;
};

module.exports = SmokeShot;

