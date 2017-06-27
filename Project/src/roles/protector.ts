export = {
    run: function (creep: Creep, flag: Flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' }});
        
        if (flag.room && creep.room == flag.room) {
            var enemyCreeps = flag.room.find<Creep>(FIND_HOSTILE_CREEPS);
            attackEnemy(creep, enemyCreeps);
        }
    }
};

function attackEnemy(creep: Creep, enemyCreeps: Creep[]) {
    var weakestEnemy = enemyCreeps.sort((a, b) => a.getActiveBodyparts.length - b.getActiveBodyparts.length)[0];
    if (creep.attack(weakestEnemy) == ERR_NOT_IN_RANGE) {
        if (creep.rangedAttack(weakestEnemy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(weakestEnemy, { visualizePathStyle: { stroke: '#9af441' } });
        }
    }
}
