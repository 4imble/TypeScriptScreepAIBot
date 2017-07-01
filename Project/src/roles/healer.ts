export = {
    run: function (creep: Creep, flag: Flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' }});
        if (flag.room && creep.room == flag.room) {
            var protectorCreeps = flag.room.find<Creep>(FIND_MY_CREEPS, {filter: (creep: Creep) => creep.memory.role == "protector"});
            healFriendly(creep, protectorCreeps);
        }
    }
};

function healFriendly(creep: Creep, hurtFriendlyCreeps: Creep[]) {
    var mostHurtProtector = hurtFriendlyCreeps.sort((a, b) => (a.hits - a.hitsMax) - (b.hits - b.hitsMax))[0];

    creep.heal(mostHurtProtector);
    creep.moveTo(mostHurtProtector, { visualizePathStyle: { stroke: '#9af441' } });
}
