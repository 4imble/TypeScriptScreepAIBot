var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#9af441'}});
                }
            } else {
                var repairs = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < (object.hitsMax/4)
                });
        
                repairs.sort((a,b) => a.hits - b.hits);
        
                if(repairs.length > 0) {
                    creep.say('🚧 repair');
                    if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairs[0], {visualizePathStyle: {stroke: '#9af441'}});
                    }
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#f4eb42'}});
            }
	    }
	}
};

module.exports = roleBuilder;