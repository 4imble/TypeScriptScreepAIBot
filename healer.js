"use strict";
function healFriendly(creep, hurtFriendlyCreeps) {
    var mostHurtProtector = hurtFriendlyCreeps.sort(function (a, b) { return (a.hits - a.hitsMax) - (b.hits - b.hitsMax); })[0];
    creep.heal(mostHurtProtector);
    creep.moveTo(mostHurtProtector, { visualizePathStyle: { stroke: '#9af441' } });
}
module.exports = {
    run: function (creep, flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
        if (flag.room && creep.room == flag.room) {
            var protectorCreeps = flag.room.find(FIND_MY_CREEPS, { filter: function (creep) { return creep.memory.role == "protector"; } });
            healFriendly(creep, protectorCreeps);
        }
    }
};
