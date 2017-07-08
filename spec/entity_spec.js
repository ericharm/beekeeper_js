describe("Entity", function () {
    var Entity = require("../src/lib/entity");
    var Config = require("../src/config/app");

    describe("Position and Velocity", function () {
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

