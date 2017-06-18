var jobManager = {
    assignJob(creep: Creep) {
        var room = creep.room;
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
        var towerlords = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerLord').length;
        var emptyTowers = creep.room.find<Structure>(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER && structure.energy < (structure.energyCapacity * 0.75);
            }
        }).length;
        var roomEnergy = _.sum(_.map(creep.room.find(FIND_SOURCES), (source: Source) => source.energy));
        
        creep.memory.pathMade = false;

        if (harvesters < 2) {
            creep.say("I mule now");
            creep.memory.role = "harvester";
        }
        else if (upgraders < 2 || roomEnergy < 1500) {
            creep.say("I upg now");
            creep.memory.role = "upgrader";
        }
        else if (emptyTowers > 1 && towerlords < 2)
        {
            creep.say("I twr lrd");
            creep.memory.role = "towerLord";
        }
        else if (room.find(FIND_CONSTRUCTION_SITES).length) {
            creep.say("I bld now");
            creep.memory.role = "builder";
        }
        else {
            creep.say("I mule now");
            creep.memory.role = "harvester";            
        }

    }
}



export = jobManager;