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
                //console.log("pair " + pair + ":");
                //for (var node = 0; node < collidingPairs[pair].length; node++) {
                    //console.log(collidingPairs[pair][node]._categories);
                //}
                // Bee hits beekeeper
                if (matchesCategories(collidingPairs[pair], "bee", "beekeeper")) {
                    commandQueue.push(Command(damageNode, ["beekeeper"]));
                    var bee = collidingPairs.where(pair, "bee");
                    bee.pluck();
                }
                // Beekeeper hits hive
                if (matchesCategories(collidingPairs[pair], "hive", "beekeeper")) {
                    commandQueue.push(Command(pushBack, ["beekeeper"]));
                    var hive = collidingPairs.where(pair, "hive");
                    var beekeeper = collidingPairs.where(pair, "beekeeper");
                    beekeeper.harvest(hive, Config.beekeeper.harvestRate);
                }
                // Beekeeper hits shot
                if (matchesCategories(collidingPairs[pair], "shot", "beekeeper")) {
                    var shot = collidingPairs.where(pair, "shot");
                    var beekeeper = collidingPairs.where(pair, "beekeeper");
                    shot.pluck();
                    beekeeper.heal(Config.shots.basePower);
                }
                // beekeeper hits Wall
                if (matchesCategories(collidingPairs[pair], "beekeeper", "wall")) {
                    commandQueue.push(Command(pushBack, ["beekeeper"]));
                }
                // bee hits smoke
                if (matchesCategories(collidingPairs[pair], "smoke", "bee")) {
                    var smokedBee = collidingPairs.where(pair, "bee");
                    smokedBee.pluck();
                }
                // smoke hits hive
                if (matchesCategories(collidingPairs[pair], "smoke", "hive")) {
                    var smokedHive = collidingPairs.where(pair, "hive");
                    smokedHive.modifyStat('honey', -1);
                }
            }
        }

    };

    return self;

};

module.exports = CollisionController;

