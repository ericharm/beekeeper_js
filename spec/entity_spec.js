describe("Entity", function () {
    var Entity = require("../src/lib/entity");
    var Config = require("../src/config/app");
    var SceneNode = require("../src/lib/scene_node");

    describe("Collision", function () {
        describe("checkNodesForCollision", function () {
            describe("with an overlapping node", function () {
                it("adds that pair to the passed array", function () {
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
                    node_a.checkNodesForCollision(node_b, collidingPairs);
                    expect(collidingPairs).toEqual([[node_a, node_b]]);

                });
            });

            describe("with a distant node", function () {
                it("does not add the node pair", function () {
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
                    node_a.checkNodesForCollision(node_b, collidingPairs);
                    expect(collidingPairs).toEqual([]);

                });
            });

            describe("with itself", function () {
                it("does not add the node pair", function () {
                    var node_a = Entity(function (self) {
                        self._position = {x: 10, y: 10};
                        self._width = 50;
                        self._height = 50;
                    });
                    var collidingPairs = [];
                    node_a.checkNodesForCollision(node_a, collidingPairs);
                    expect(collidingPairs).toEqual([]);
                });
            });
        });

        describe("checkSceneCollision", function () {
            describe("with another overlapping node in the scene", function () {
                it("does add the node pair", function () {
                    var node_a = Entity(function (a) {
                        a._position = {x: 90, y: 90};
                        a._width = 50;
                        a._height = 50;
                        a._categories = ['a'];
                    });
                    var node_b = Entity(function (b) {
                        b._position = {x: 100, y: 100};
                        b._width = 50;
                        b._height = 50;
                        b._categories = ['b'];
                    });

                    var layer1 = SceneNode();
                    var layer2 = SceneNode();
                    layer1.attachChild(node_a);
                    layer1.attachChild(node_b);

                    var sceneGraph = SceneNode();
                    sceneGraph.attachChild(layer1);
                    sceneGraph.attachChild(layer2);

                    var collidingPairs = [];
                    sceneGraph.checkSceneCollision(sceneGraph, collidingPairs);
                    expect(collidingPairs).toEqual([[node_b, node_a],[node_a, node_b]]);
                });
            });

            describe("with a child of another node in the scene", function () {
                it("does add the node pair", function () {
                    var node_a = Entity(function (a) {
                        a._position = {x: 90, y: 90};
                        a._width = 50;
                        a._height = 50;
                        a._categories = ['a'];
                    });
                    var node_b = Entity(function (b) {
                        b._position = {x: 0, y: 0};
                        b._width = 50;
                        b._height = 50;
                        b._categories = ['b'];
                    });
                    var node_b_child = Entity(function (child) {
                        child._position = {x: 100, y: 100};
                        child._width = 50;
                        child._height = 50;
                        child._categories = ['child'];
                    });

                    node_b.attachChild(node_b_child);

                    var layer1 = SceneNode();
                    var layer2 = SceneNode();
                    layer1.attachChild(node_a);
                    layer1.attachChild(node_b);

                    var sceneGraph = SceneNode();
                    sceneGraph.attachChild(layer1);
                    sceneGraph.attachChild(layer2);

                    var collidingPairs = [];
                    sceneGraph.checkSceneCollision(sceneGraph, collidingPairs);
                    expect(collidingPairs).toEqual([[node_b_child, node_a]]);
                });
            });
        });
    });

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

