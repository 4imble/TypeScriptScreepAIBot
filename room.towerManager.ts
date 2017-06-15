export = {
    run: function() {
        var tower = Game.getObjectById<Tower>('5bb20ad44d6d2ba8602bc8ca');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange<Structure>(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange<Creep>(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
};