export = {
    run: (creep: Creep, flag: Flag) => {
        if (creep.room != flag.room) {
            creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        else if (creep.room.controller) {
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
}