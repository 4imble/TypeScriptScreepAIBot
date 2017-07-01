import roleHarvester = require('./roles/harvester');
import roleMule = require('./roles/mule');
import roleWorker = require('./roles/worker');
import roleUpgrader = require('./roles/upgrader');
import SpawnManager = require('./spawnManager');
import TowerManager = require('./towerManager');
import RemoteOperations = require('./remoteOperations');

export = {
    loop: () => {
        var myRooms = _.filter(Game.rooms, (room: Room) => room.controller && room.controller.my && room.energyAvailable);
        var flagRooms = _.map(_.filter(Game.flags, (flag: Flag) => flag.room != undefined), (flag: Flag) => flag.room);
        var myCreeps = _.filter(Game.creeps, (creep: Creep) => creep.my);
        var flags = _.filter(Game.flags, (flag: Flag) => flag.memory.type != undefined);

        _.each(myCreeps, (creep: Creep) => {
            // recycleCreep(creep);
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'mule') {
                roleMule.run(creep);
            }
            if (creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        });

        _.each(flags, (flag: Flag) => {
            if (Game.spawns[flag.memory.spawn].room.find(FIND_CREEPS).length >= 6) {
                RemoteOperations.run(flag);
            }
        });
        _.each(myRooms, (room: Room) => {
            SpawnManager.run(room);
            TowerManager.run(room);
        });

        cleanMemory();
    }
}

function cleanMemory() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for (var name in Memory.flags) {
        if (!Game.flags[name]) {
            delete Memory.flags[name];
        }
    }
}

function recycleCreep(creep: Creep) {
    var spawn = _.find(creep.room.find<Spawn>(FIND_STRUCTURES), (struct: Spawn) => struct.structureType == STRUCTURE_SPAWN);
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffffff' } });
    var creeps = spawn.pos.findInRange(FIND_MY_CREEPS, 1);
    _.each(creeps, (x: Creep) => spawn.recycleCreep(x));
}