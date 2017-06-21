"use strict";
module.exports = {
    run: function () {
        var tower = Game.getObjectById('5941bc54ed27dd8c30b85251');
        if (tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            else {
                var repairs = tower.room.find(FIND_STRUCTURES, {
                    filter: function (object) { return object.hits < (object.hitsMax / 4) && object.structureType != STRUCTURE_WALL; }
                });
                repairs.sort(function (a, b) { return a.hits - b.hits; });
                if (repairs.length > 0) {
                    tower.repair(repairs[0]);
                }
            }
        }
    }
};
