var Command = require("../lib/command.js");
//var Config  = require("../config/app.js");

var CollisionController = function () {

    // maybe there's a better place for these functions
    var matchesCategories = function (nodePair, type1, type2) {
        var categories1 = nodePair[0].getCategories();
        var categories2 = nodePair[1].getCategories();
        //this will match twice if you pass it the same argument
        //for both types
        if (categories1.indexOf(type1) >= 0 && categories2.indexOf(type2) >= 0) {
            return true;
        } else {
            return false;
        }
    };

    var damageNode = function (node, deltaTime) {
        node.damage(10);
    };

    var pushBack = function (node, deltaTime) {
        node.pushBack(deltaTime);
    };
    var self = {
        handleCollisions: function (collidingPairs, commandQueue) {
            for (var pair = 0; pair < collidingPairs.length; pair++) {
                // Bee hits beekeeper
                if (matchesCategories(collidingPairs[pair], "beekeeper", "bee")) {
                    commandQueue.push(Command.new(damageNode, ["beekeeper"]));
                    var bee = collidingPairs.where(pair, "bee");
                    bee.pluck();
                }
                // Beekeeper hits hive
                if (matchesCategories(collidingPairs[pair], "beekeeper", "hive")) {
                    commandQueue.push(Command.new(pushBack, ["beekeeper"]));
                    var hive = collidingPairs.where(pair, "hive");
                    var beekeeper = collidingPairs.where(pair, "beekeeper");
                    beekeeper.harvest(hive, Config.beekeeper.harvestRate);
                }
            }
        }

    };

    return self;

};

module.exports = CollisionController;

