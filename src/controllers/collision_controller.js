var Command = require('../lib/command.js');

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

var drainHoney = function (node, deltaTime) {
    //Config.beekeeper.harvestRate
    node.modifyStat('honey', (-10 * deltaTime));
};

var addHoney = function (node, deltaTime) {
    //unless hive has less than 10 honey
    node.modifyStat('honey', (10 * deltaTime));
};

var pluck = function (node, deltaTime) {
    node.pluck();
};

var CollisionController = {
    handleCollisions: function (collidingPairs, commandQueue) {
        for (var i = 0; i < collidingPairs.length; i++) {
            if (matchesCategories(collidingPairs[i], "beekeeper", "bee")) {
                commandQueue.push(Command.new(damageNode, ["beekeeper"]));
                // maybe pass the bee from collidingPairs[i]
                commandQueue.push(Command.new(pluck, ["bee"]));
            }
            if (matchesCategories(collidingPairs[i], "beekeeper", "hive")) {
                commandQueue.push(Command.new(pushBack, ["beekeeper"]));
                // maybe pass the hive from collidingPairs[i]
                commandQueue.push(Command.new(drainHoney, ["hive"]));
                commandQueue.push(Command.new(addHoney, ["beekeeper"]));
            }
        }
    }
};

module.exports = CollisionController;

