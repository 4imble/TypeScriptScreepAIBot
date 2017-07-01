"use strict";
var BodyCalulator = require("./bodyCalculator");
var SpawnManager = (function () {
    function SpawnManager() {
        this.run = function (room) {
            var spawn = room.find(FIND_MY_SPAWNS)[0];
            if (!spawn.spawning)
                assignWorkers(room, spawn);
        };
    }
    return SpawnManager;
}());
function assignWorkers(room, spawn) {
    var roomSources = room.find(FIND_SOURCES);
    var roomCreeps = room.find(FIND_MY_CREEPS);
    var _loop_1 = function (source) {
        if (!_.any(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "harvester"; })) {
            console.log("make harverster" + source.id);
            spawn.createCreep(BodyCalulator.getHarvesterBody(spawn.room), null, { role: "harvester", sourceid: source.id, room: room.name });
            return { value: void 0 };
        }
        else if (_.filter(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "mule"; }).length < 2) {
            console.log("make mule" + source.id);
            spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id, room: room.name });
            return { value: void 0 };
        }
    };
    for (var _i = 0, roomSources_1 = roomSources; _i < roomSources_1.length; _i++) {
        var source = roomSources_1[_i];
        var state_1 = _loop_1(source);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    if (!_.any(roomCreeps, function (creep) { return creep.memory.room == room.name && creep.memory.role == "upgrader"; })) {
        console.log("make upgrader");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "upgrader", room: room.name });
    }
    else if (_.filter(roomCreeps, function (creep) { return creep.memory.room == room.name && creep.memory.role == "worker"; }).length < getOptimalWorkerCount(room)) {
        console.log("worker");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker", job: "requesting_energy", room: room.name });
    }
}
function getOptimalWorkerCount(room) {
    return room.controller.level + 1;
}
module.exports = new SpawnManager();
