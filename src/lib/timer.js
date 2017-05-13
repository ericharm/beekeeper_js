var Config = require("../config/app.js");

var Timer = function (callback) {

    var timeLeft = 0;

    self = {
        update: function (deltaTime) {
            timeLeft -= this.ms / Config.frameRate * deltaTime;
            if (timeLeft <= 0) {
                this.onEnd();
                this.destroy();
            }
        },
        destroy: function () {
            this.container.splice(this.container.indexOf(this), 1);
        },
        onStart: function () {
            //do nothing by default
        },
        onEnd: function () {
            //do nothing by default
        },
        ms: 0,
        container: null
    };

    if (callback) callback(self);

    (function () {
        self.onStart();
        timeLeft = self.ms;
    }());

    return self;
};

module.exports = Timer;

