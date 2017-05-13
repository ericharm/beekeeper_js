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
    node.modifyStat('currentHealth', -1);
};

var pushBack = function (node, deltaTime) {
    node.pushBack(deltaTime);
};


var CollisionController = {
    handleCollisions: function (collidingPairs, commandQueue) {
        for (var i = 0; i < collidingPairs.length; i++) {
            if (matchesCategories(collidingPairs[i], "beekeeper", "bee")) {
                commandQueue.push(Command.new(damageNode, ["beekeeper"]));
            }
            if (matchesCategories(collidingPairs[i], "beekeeper", "hive")) {
                commandQueue.push(Command.new(pushBack, ["beekeeper"]));
            }
        }
    }
};

module.exports = CollisionController;

