"use strict";
function attackEnemy(creep, enemyCreeps) {
    var weakestEnemy = _.sortBy(enemyCreeps, function (creep) { return creep.hits; })[0];
    if (creep.attack(weakestEnemy) == ERR_NOT_IN_RANGE) {
        if (creep.rangedAttack(weakestEnemy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(weakestEnemy, { visualizePathStyle: { stroke: '#9af441' } });
        }
    }
}
module.exports = {
    run: function (creep, flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
        if (flag.room && creep.room == flag.room) {
            var enemyCreeps = flag.room.find(FIND_HOSTILE_CREEPS);
            attackEnemy(creep, enemyCreeps);
        }
    }
};
