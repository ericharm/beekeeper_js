describe("Entity", function () {
    var Entity = require("../src/lib/entity.js");

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
            var colliding = node_a.collidesWith(node_b);
            expect(colliding).toEqual(true);

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
            var colliding = node_a.collidesWith(node_b);
            expect(colliding).toEqual(false);

        });
    });

    describe("collidesWith the node itself", function () {
        it("returns false", function () {
            
            var node_a = Entity(function (self) {
                self._position = {x: 10, y: 10};
                self._width = 50;
                self._height = 50;
            });

            var colliding = node_a.collidesWith(node_a);
            expect(colliding).toEqual(false);

        });
    });
});
