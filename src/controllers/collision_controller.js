var Config  = require("../config/app.js");
var Command = require("../lib/command.js");

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
        node.damage(Config.bees.basePower);
    };

    var pushBack = function (node, deltaTime) {
        node.pushBack(deltaTime);
    };

    var self = {
        handleCollisions: function (collidingPairs, commandQueue) {
            for (var pair = 0; pair < collidingPairs.length; pair++) {
                // Bee hits beekeeper
                if (matchesCategories(collidingPairs[pair], "beekeeper", "bee")) {
                    commandQueue.push(Command(damageNode, ["beekeeper"]));
                    var bee = collidingPairs.where(pair, "bee");
                    bee.pluck();
                }
                // Beekeeper hits hive
                if (matchesCategories(collidingPairs[pair], "beekeeper", "hive")) {
                    commandQueue.push(Command(pushBack, ["beekeeper"]));
                    var hive = collidingPairs.where(pair, "hive");
                    var beekeeper = collidingPairs.where(pair, "beekeeper");
                    beekeeper.harvest(hive, Config.beekeeper.harvestRate);
                }
                // beekeeper hits Wall
                if (matchesCategories(collidingPairs[pair], "beekeeper", "wall")) {
                    commandQueue.push(Command(pushBack, ["beekeeper"]));
                }
                // bee hits smoke
                if (matchesCategories(collidingPairs[pair], "bee", "smoke")) {
                    var smokedBee = collidingPairs.where(pair, "bee");
                    smokedBee.pluck();
                }
                // smoke hits hive
                if (matchesCategories(collidingPairs[pair], "hive", "smoke")) {
                    var smokedHive = collidingPairs.where(pair, "hive");
                    smokedHive.modifyStat('honey', -1);
                }
            }
        }

    };

    return self;

};

module.exports = CollisionController;

