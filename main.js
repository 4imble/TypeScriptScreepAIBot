"use strict";
var roleHarvester = require("./harvester");
var roleMule = require("./mule");
var roleWorker = require("./worker");
var roleUpgrader = require("./upgrader");
var SpawnManager = require("./spawnManager");
var TowerManager = require("./towerManager");
function recycleCreep(creep) {
    var spawn = _.find(creep.room.find(FIND_STRUCTURES), function (struct) { return struct.structureType == STRUCTURE_SPAWN; });
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffffff' } });
    var creeps = spawn.pos.findInRange(FIND_MY_CREEPS, 1);
    _.each(creeps, function (x) { return spawn.recycleCreep(x); });
}
module.exports = {
    loop: function () {
        var myRooms = _.filter(Game.rooms, function (room) { return room.controller.my; });
        var myCreeps = _.filter(Game.creeps, function (creep) { return creep.my; });
        _.each(myCreeps, function (creep) {
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
        _.each(myRooms, function (room) {
            SpawnManager.run(room);
            TowerManager.run(room);
        });
    }
};
