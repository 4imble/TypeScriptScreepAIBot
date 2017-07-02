export = {
    run: function (creep: Creep, flag: Flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
        if (flag) {
            if (flag.room && creep.room != flag.room)
                return;
        }

        var protectorCreeps = creep.room.find<Creep>(FIND_MY_CREEPS, { filter: (creep: Creep) => creep.memory.role == "protector" });
        healFriendly(creep, protectorCreeps);
    }
};

function healFriendly(creep: Creep, hurtFriendlyCreeps: Creep[]) {
    var mostHurtProtector = _.sortBy(hurtFriendlyCreeps, (creep: Creep) => creep.hits - creep.hitsMax)[0];

    creep.heal(mostHurtProtector);
    creep.moveTo(mostHurtProtector, { visualizePathStyle: { stroke: '#9af441' } });
}
