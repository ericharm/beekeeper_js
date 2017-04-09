var Entity = require("./entity.js");

module.exports = {

    new: function () {

        // inherit from Entity
        var self = Entity.new();
        return self;
    }

};

