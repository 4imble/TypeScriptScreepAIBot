import PositionHelper = require('../helpers/positionHelper');

export = {
    run: function (creep: Creep) {
        var source = Game.getObjectById<Source>(creep.memory.sourceid);
        if(!source) return;        

        var container = source.pos.findInRange<Container>(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_CONTAINER } })[0];
        
        if ((container && !PositionHelper.areSameLocation(creep, container)) || creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container || source, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};