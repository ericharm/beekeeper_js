var Entity = require("../../lib/entity.js");
var Config = require("../../config/app.js");

var SmokeShot = function (callback) {

    // extends Entity
    var self = Entity();

    var extended = {
        // protected
        _width: 200,
        _height: 200,
        hitBox: function () {
            var p = this._position;
            var w = this._width;
            var h = this._height;

            var bounds = {
                x: p.x - (w / 2) + 2, y: p.y - (h / 2) + 2,
                width: w - 4, height: h - 4
            };

            return {
                bounds: bounds,
                render: function (canvas) {
                    canvas.strokeStyle = "#ffffff";
                    canvas.strokeRect(
                        this.bounds.x, this.bounds.y,
                        this.bounds.width, this.bounds.height
                    );
                }
            };
        },
        _renderCurrent: function (canvas) {
            canvas.globalAlpha = 0.5;
            canvas.beginPath();
            canvas.arc(
                this._position.x, this._position.y,
                this._width / 2, 0, 2 * Math.PI, false
            );
            canvas.fillStyle = "#000000";
            canvas.fill();
            canvas.globalAlpha = 1;
        }
    };

    for (var attribute in extended) {
        self[attribute] = extended[attribute];
    }

    self._categories.push('smoke');

    if (callback) callback(self);

    (function () {
        self.timers.addTimer(function (timer) {
            timer.onEnd = function () {
                self.pluck();
            };
            timer.ms = Config.beekeeper.smokeLength;
        });
    }());


    return self;
};

module.exports = SmokeShot;

