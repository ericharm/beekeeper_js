/*
 * Send commands to select scene nodes in response to input events. Any node
 * with a category that matches anything in the second paramater
 * will call action(node, deltaTime) on itself when the command propogates
 * through the SceneGraph.  Implemented by Player.
 */

Command = function (action, categories) {
    var self = {
        action: action,
        categories: categories
    };
    return self;
};

module.exports = Command;

