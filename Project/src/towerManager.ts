export = {
    run: function (room: Room) {
        var towers = _.filter(room.find<Tower>(FIND_STRUCTURES), struct => struct.structureType == STRUCTURE_TOWER);

        _.each(towers, (tower: Tower) => {
            var closestHostile = tower.pos.findClosestByRange<Creep>(FIND_HOSTILE_CREEPS);
            var injuredAlly = _.find(tower.room.find<Creep>(FIND_MY_CREEPS), (creep: Creep) => creep.hits < creep.hitsMax);

            if (closestHostile) {
                tower.attack(closestHostile);
            }
            else if (injuredAlly) {
                tower.heal(injuredAlly);
            }
            else {
                var repairs = _.filter(tower.room.find<Structure>(FIND_STRUCTURES),
                    (struct: Structure) => 
                        struct.hits < (struct.hitsMax / 4) 
                        && !(struct.structureType == STRUCTURE_WALL && struct.hits > 50000 )
                        && !(struct.structureType == STRUCTURE_RAMPART && struct.hits > 49000 ));

                repairs.sort((a, b) => a.hits - b.hits);
                if (repairs.length) {
                    tower.repair(repairs[0]);
                }
            }
        })
    }
};