var Config = require("../config/app.js");

var Timers = function (callback) {

    var self = {
        list: [],
        addTimer: function (callback) {
            var timer = createTimer(callback);
            timer.container = this.list;
            this.list.push(timer);
        },
        update: function (deltaTime) {
            for (var timer = 0; timer < this.list.length; timer++) {
                this.list[timer].update(deltaTime);
            }
        }
    };


    var createTimer = function (callback) {

        var timer = {
            update: function (deltaTime) {
                this.timeLeft -= this.ms / Config.frameRate * deltaTime;
                if (this.timeLeft <= 0) {
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
            timeLeft: 0,
            container: null
        };

        if (callback) callback(timer);

        (function () {
            timer.onStart();
            timer.timeLeft = timer.ms;
        }());

        return timer;
    };

    return self;

};

module.exports = Timers;

