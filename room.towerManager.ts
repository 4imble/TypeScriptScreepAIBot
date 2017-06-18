export = {
    run: function () {
        var tower = Game.getObjectById<Tower>('5941bc54ed27dd8c30b85251');

        if (tower) {
            var closestHostile = tower.pos.findClosestByRange<Creep>(FIND_HOSTILE_CREEPS);

            if (closestHostile) {
                tower.attack(closestHostile);
            } else {
                var repairs = tower.room.find<Structure>(FIND_STRUCTURES, {
                    filter: (object:Structure) => object.hits < (object.hitsMax / 4) && object.structureType != STRUCTURE_WALL
                });

                repairs.sort((a, b) => a.hits - b.hits);

                if (repairs.length > 0) {
                    tower.repair(repairs[0]);
                }
            }
        }
    }
};