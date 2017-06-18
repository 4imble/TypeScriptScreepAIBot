export = {
    run: function (creep: Creep) {
        var attackFlag: Flag = Game.flags["AttackPoint"];

        console.log("AttackPoint: " + attackFlag);

        var closestHostile = creep.pos.findClosestByRange<Creep>(FIND_HOSTILE_CREEPS);
        var closestEnemyTower = creep.pos.findClosestByRange<Tower>(FIND_HOSTILE_STRUCTURES, {
            filter: object => object.structureType == STRUCTURE_TOWER
        });
        var closestEnemyController = creep.pos.findClosestByRange<Controller>(FIND_HOSTILE_STRUCTURES, {
            filter: object => object.structureType == StructureController
        });

        if (closestEnemyTower) {
            creep.say(`att: Tower`);
            
            if (creep.attack(closestEnemyTower) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestEnemyTower, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else if (closestHostile) {
            creep.say(`att: cre`);
            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else if (closestEnemyController) {
            creep.say(`att: con`);
            if (creep.attackController(closestEnemyController) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestEnemyController, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            creep.say(`mov flag`);
            creep.moveTo(attackFlag, { visualizePathStyle: { stroke: '#f4ee42' } });
        }
    }
};