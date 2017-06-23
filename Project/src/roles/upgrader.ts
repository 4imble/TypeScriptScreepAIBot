var roleUpgrader = {

    run: function (creep: Creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#41d9f4' } });
        
        else if (creep.carry.energy < creep.carryCapacity) 
            creep.memory.job = "requesting_energy";
        else 
            creep.memory.job = "upgrading";
    }
};

export = roleUpgrader;