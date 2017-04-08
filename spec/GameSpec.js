describe("Game", function () {
    var game = require("../src/game.js");

    describe("game", function () {
        it("does something", function () {
            var Game = game.new();
            expect(Game.hello()).toEqual("hello"); 
        });  
    });

});
