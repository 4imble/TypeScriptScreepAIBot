"use strict";
var BodyCalulator = require("./bodyCalculator");
var SpawnManager = (function () {
    function SpawnManager() {
        this.run = function (room) {
            var spawn = room.find(FIND_MY_SPAWNS)[0];
            var roomSources = room.find(FIND_SOURCES);
            var roomCreeps = room.find(FIND_MY_CREEPS);
            if (!spawn.spawning)
                assignWorkers(roomSources, spawn, roomCreeps);
        };
    }
    return SpawnManager;
}());
function assignWorkers(roomSources, spawn, roomCreeps) {
    var _loop_1 = function (source) {
        if (!_.any(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "harvester"; })) {
            console.log("make harverster" + source.id);
            spawn.createCreep(BodyCalulator.getHarvesterBody(spawn.room), null, { role: "harvester", sourceid: source.id });
            return { value: void 0 };
        }
        else if (_.filter(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "mule"; }).length < 2) {
            console.log("make mule" + source.id);
            spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id });
            return { value: void 0 };
        }
    };
    for (var _i = 0, roomSources_1 = roomSources; _i < roomSources_1.length; _i++) {
        var source = roomSources_1[_i];
        var state_1 = _loop_1(source);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    if (!_.any(roomCreeps, function (creep) { return creep.memory.room == spawn.room.name && creep.memory.role == "upgrader"; })) {
        console.log("make upgrader");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "upgrader", room: spawn.room.name });
    }
    else if (_.filter(roomCreeps, function (creep) { return creep.memory.room == spawn.room.name && creep.memory.role == "worker"; }).length < 3) {
        console.log("worker");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker", job: "requesting_energy", room: spawn.room.name });
    }
}
module.exports = new SpawnManager();
