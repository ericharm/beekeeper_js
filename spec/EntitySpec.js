describe("Entity", function () {
    var Entity = require("../src/lib/entity.js");
    var Config = require("../src/config/app.js");

    describe("Entity Collision", function () {

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

    describe("Entity Position and Velocity", function () {

        describe("apply a velocity to an entity", function () {
            it("changes the entity's position over time", function () {

                var myEntity = Entity(function (self) {
                    self.setPosition({x: 0, y: 0});
                    self.setVelocity({x: 1, y: 0});
                });

                // 1 second passes
                var accum = 0;
                while (accum < Config.frameRate) {
                    myEntity.update(1);
                    accum += 1;
                }

                expect(myEntity.getPosition()).toEqual({x: Config.frameRate, y: 0});

            });
        });

    });

});

