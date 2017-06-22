"use strict";
var BodyCalulator = require("./bodyCalculator");
var SpawnManager = (function () {
    function SpawnManager() {
        this.run = function () {
            var spawn = Game.spawns["Spawn1"];
            var roomSources = spawn.room.find(FIND_SOURCES);
            var roomCreeps = spawn.room.find(FIND_CREEPS);
            if (!spawn.spawning)
                _.forEach(roomSources, function (x) { return assignWorkers(x, spawn, roomCreeps); });
        };
    }
    SpawnManager.prototype.contstructor = function () { };
    return SpawnManager;
}());
function assignWorkers(source, spawn, roomCreeps) {
    if (!_.any(roomCreeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "harvester"; })) {
        spawn.createCreep(BodyCalulator.getHarvesterBody(spawn.room), null, { role: "harvester", sourceid: source.id });
    }
    else if (!_.any(roomCreeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "mule"; })) {
        spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id });
    }
}
module.exports = new SpawnManager();
