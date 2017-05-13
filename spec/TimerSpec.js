var Timer = require("../src/lib/timer.js");
var Config = require("../src/config/app.js");
var Entity = require("../src/lib/entity.js");

describe("Timer", function () {

    beforeEach(function () {
        timers = {
            list: [],
            push: function (timer) {
                timer.container = this.list;
                this.list.push(timer);
            },
            update: function (deltaTime) {
                for (var timer = 0; timer < this.list.length; timer++) {
                    this.list[timer].update(deltaTime);
                }
            }
        };
    });

    function updateTimers(updateCount) {
        for (var i = 0; i < updateCount; i++) {
            timers.update(1);
        }
    }

    it("calls the onStart method immediately", function () {
        var entity = Entity(function (self) {
            self._startingHealth = 1;
        });

        var timer = Timer(function (self) {
            self.onStart = function (self) {
                entity.modifyStat('currentHealth', 9);
            };
            self.ms = 1000;
        });

        expect(entity.getHealth().current).toEqual(10);
    });

    it("calls the onEnd method after the given time in ms", function () {
        var entity = Entity(function (self) {
            self._startingHealth = 1;
        });

        var timer = Timer(function (self) {
            self.onEnd = function (self) {
                entity.modifyStat('currentHealth', 9);
            };
            self.ms = 1000;
        });

        timers.push(timer);
        updateTimers(Config.frameRate - 1);

        expect(entity.getHealth().current).toEqual(1);

        updateTimers(1);

        expect(entity.getHealth().current).toEqual(10);
        expect(entity.getHealth().max).toEqual(1);

    });
});

