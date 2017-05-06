describe("EntityCollision", function () {
    var Entity = require("../../src/lib/entity.js");

    describe("collidesWith an overlapping node", function () {
        it("returns true", function () {
            var node_a = Entity(function (self) {
                self._position = {x: 10, y: 10};
                self._width = 100;
                self._height = 100;
            });
            var node_b = Entity(function (self) {
                self._position = {x: 50, y: 50};
                self._width = 100;
                self._height = 100;
            });
            var collidingPairs = [];
            var colliding = node_a.collidesWith(node_b, collidingPairs);
            expect(colliding).toEqual(true);
            expect(collidingPairs).toEqual([[node_a, node_b]]);

        });
    });

    describe("collidesWith a distant node", function () {
        it("returns false", function () {
            var node_a = Entity(function (self) {
                self._position = {x: 10, y: 10};
                self._width = 50;
                self._height = 50;
            });
            var node_b = Entity(function (self) {
                self._position = {x: 100, y: 100};
                self._width = 50;
                self._height = 50;
            });
            var collidingPairs = [];
            var colliding = node_a.collidesWith(node_b, collidingPairs);
            expect(colliding).toEqual(false);
            expect(collidingPairs).toEqual([]);

        });
    });

    describe("collidesWith the node itself", function () {
        it("returns false", function () {
            
            var node_a = Entity(function (self) {
                self._position = {x: 10, y: 10};
                self._width = 50;
                self._height = 50;
            });
            var collidingPairs = [];
            var colliding = node_a.collidesWith(node_a, collidingPairs);
            expect(colliding).toEqual(false);
            expect(collidingPairs).toEqual([]);

        });
    });
});

