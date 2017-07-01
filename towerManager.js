"use strict";
module.exports = {
    run: function (room) {
        var towers = _.filter(room.find(FIND_STRUCTURES), function (struct) { return struct.structureType == STRUCTURE_TOWER; });
        _.each(towers, function (tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var injuredAlly = _.find(tower.room.find(FIND_MY_CREEPS), function (creep) { return creep.hits < creep.hitsMax; });
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            else if (injuredAlly) {
                tower.heal(injuredAlly);
            }
            else {
                var repairs = _.filter(tower.room.find(FIND_STRUCTURES), function (struct) {
                    return struct.hits < (struct.hitsMax / 4)
                        && !(struct.structureType == STRUCTURE_WALL && struct.hits > 30000)
                        && !(struct.structureType == STRUCTURE_RAMPART && struct.hits > 49000);
                });
                repairs.sort(function (a, b) { return a.hits - b.hits; });
                if (repairs.length) {
                    tower.repair(repairs[0]);
                }
            }
        });
    }
};
