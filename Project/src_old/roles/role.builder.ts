var roleBuilder = {
    run: function(creep: Creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find<ConstructionSite>(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#9af441'}});
                }
            }
            else {
                creep.memory.role = "gatherer";
            }
	    }
	    else {
	        creep.memory.role = "gatherer";
	    }
	}
};

export = roleBuilder;