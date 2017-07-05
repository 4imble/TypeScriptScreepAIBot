"use strict";
function healFriendly(creep, hurtFriendlyCreeps) {
    var mostHurtProtector = _.sortBy(hurtFriendlyCreeps, function (creep) { return creep.hits - creep.hitsMax; })[0];
    creep.heal(mostHurtProtector);
    creep.moveTo(mostHurtProtector, { visualizePathStyle: { stroke: '#9af441' } });
}
module.exports = {
    run: function (creep, flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
        if (flag) {
            if (flag.room && creep.room != flag.room)
                return;
        }
        var protectorCreeps = creep.room.find(FIND_MY_CREEPS, { filter: function (creep) { return creep.memory.role == "protector"; } });
        healFriendly(creep, protectorCreeps);
    }
};
