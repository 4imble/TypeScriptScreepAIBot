"use strict";
var jobManager = {
    assignJob: function (creep) {
        var room = creep.room;
        var upgraders = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'upgrader'; }).length;
        var harvesters = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'harvester'; }).length;
        var emptyTowers = creep.room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
            }
        }).length;
        var roomEnergy = _.sum(_.map(creep.room.find(FIND_SOURCES), function (source) { return source.energy; }));
        console.log(roomEnergy);
        if (harvesters < 2) {
            creep.say("I mule now");
            creep.memory.role = "harvester";
        }
        else if (upgraders < 2 || roomEnergy < 1500) {
            creep.say("I upg now");
            creep.memory.role = "upgrader";
        }
        else if (emptyTowers > 1) {
            creep.say("I twr lrd");
            creep.memory.role = "towerLord";
        }
        else if (room.find(FIND_CONSTRUCTION_SITES).length) {
            creep.say("I bld now");
            creep.memory.role = "builder";
        }
        else {
            creep.say("I mule now");
            creep.memory.role = "harvester";
        }
    }
};
module.exports = jobManager;
