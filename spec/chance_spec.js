describe("Chance", function () {

    var Chance = require("../src/lib/chance.js");

    describe("roll a 6 sided die", function () {
        it("returns a number between 1 and 6", function () {
            var roll = Chance.roll(3);
            expect(roll).toBeGreaterThan(0);
            expect(roll).toBeLessThan(4);
        });
    });

    describe("flip a coin", function () {
        it("returns either true or false", function () {
            var tosses = [];
            for (var i = 0; i < 10; i++) {
                tosses.push(Chance.flip());
            }
            expect(tosses).toContain(true);
            expect(tosses).toContain(false);
        });
    });

});

