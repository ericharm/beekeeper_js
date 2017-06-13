var Config = require("../src/config/app.js");
var Timers = require("../src/lib/timers.js");
var Entity = require("../src/lib/entity.js");

describe("Timer", function () {

    beforeEach(function () {
        entity = Entity(function (self) {
            self._startingHealth = 1;
            self.timers = Timers();
            self._updateCurrent = function (deltaTime) {
                self.timers.update(deltaTime);
            };
        });
    });

    function updateEntity(updateCount) {
        for (var i = 0; i < updateCount; i++) {
            entity.update(1);
        }
    }

    it("calls the onStart method immediately", function () {
        entity.timers.addTimer(function (self) {
             self.onStart = function (self) {
                entity.modifyStat('currentHealth', 9);
            };
            self.ms = 1000;
        });

        expect(entity.getHealth().current).toEqual(10);
        expect(entity.getHealth().max).toEqual(1);
    });

    it("calls the onEnd method after the given time in ms", function () {
        entity.timers.addTimer(function (self) {
            self.onEnd = function () {
                entity.modifyStat('currentHealth', 9);
            };
            self.ms = 2000;
        });

        for (var i = 0; i < (Config.frameRate * 2 - 1); i++) {
            updateEntity(1);
        }

        expect(entity.getHealth().current).toEqual(1);

        updateEntity(2);

        expect(entity.getHealth().current).toEqual(10);
        expect(entity.getHealth().max).toEqual(1);

    });
});

