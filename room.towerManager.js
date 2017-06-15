"use strict";
module.exports = {
    run: function () {
        var tower = Game.getObjectById('5bb20ad44d6d2ba8602bc8ca');
        if (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (structure) { return structure.hits < structure.hitsMax; }
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
};
