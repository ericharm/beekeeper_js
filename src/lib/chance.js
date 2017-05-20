Chance = {
    roll: function (sides) {
        return (Math.floor(Math.random() * sides)) + 1;
    },
    flip: function () {
        var toss = this.roll(2);
        if (toss === 1) return true;
        else return false;
    }
};

module.exports = Chance;

