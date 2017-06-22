export = {
    run: function (creep) {

        var source = Game.getObjectById<Source>(creep.memory.sourceid);
        var container = source.pos.findClosestByRange<Container>(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
        var pendingContainer = source.pos.findClosestByRange<ConstructionSite>(FIND_CONSTRUCTION_SITES);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        else if (creep.carry.energy == creep.carryCapacity) {
            if (container) {
                creep.transfer(container, RESOURCE_ENERGY);
            }
            else {
                creep.room.createConstructionSite(getSquareBehindCreepOppositeSource(creep, source), STRUCTURE_CONTAINER);
                creep.build(pendingContainer);
            }
        }
    }
};

function inverseDirection(direction) {
    return direction <= 4 ? direction + 4 : direction - 4;
}

function getSquareBehindCreepOppositeSource(creep, source) {
    var xdiff = creep.pos.x - source.pos.x;
    var ydiff = creep.pos.y - source.pos.y;

    return new RoomPosition(creep.pos.x + xdiff, creep.pos.y + ydiff, creep.room.name);
}