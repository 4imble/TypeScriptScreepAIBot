import roleHarvester = require('./roles/harvester');
import roleMule = require('./roles/mule');
import roleWorker = require('./roles/worker');
import SpawnManager = require('./spawnManager');
import TowerManager = require('./towerManager');

export = {
    loop: () => {
        var myRooms = _.filter(Game.rooms, (room: Room) => room.controller.my);
        var myCreeps = _.filter(Game.creeps, (creep: Creep) => creep.my);

        _.each(myCreeps, (creep: Creep) => {
            //recycleCreep(creep);

            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'mule') {
                roleMule.run(creep);
            }
            if (creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
        });

        _.each(myRooms, (room: Room) => {
            SpawnManager.run(room);
            TowerManager.run(room);
        });
    }
}

function recycleCreep(creep: Creep) {
    var spawn = _.find(creep.room.find<Spawn>(FIND_STRUCTURES), (struct: Spawn) => struct.structureType == STRUCTURE_SPAWN);
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffffff' } });
    var creeps = spawn.pos.findInRange(FIND_MY_CREEPS, 1);
    _.each(creeps, (x: Creep) => spawn.recycleCreep(x));
}