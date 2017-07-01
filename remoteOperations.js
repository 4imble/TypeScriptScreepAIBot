"use strict";
var BodyCalulator = require("./bodyCalculator");
var roleCapturer = require("./capturer");
var roleBuilder = require("./builder");
var roleProtector = require("./protector");
var roleHealer = require("./healer");
function manageUpgrading(flag) {
    var spawn = _.find(Game.spawns, function (spawn) { return spawn.room == flag.room; });
    if (spawn)
        flag.remove();
    if (_.filter(Game.creeps, function (creep) { return creep.memory.room == flag.room.name && creep.memory.role == "worker"; }).length < 3) {
        var originSpawn = Game.spawns[flag.memory.spawn];
        console.log("remote worker");
        originSpawn.createCreep(BodyCalulator.getWorkerBody(originSpawn.room), null, { role: "worker", job: "requesting_energy", room: flag.room.name });
    }
}
function manageRemoteHealing(flag) {
    var healer = _.find(Game.creeps, function (creep) { return flag.memory.healer && creep.name == flag.memory.healer; });
    if (!healer) {
        var originSpawn = Game.spawns[flag.memory.spawn];
        var creepName = originSpawn.createCreep(BodyCalulator.getHealerBody(originSpawn.room), null, { role: "healer" });
        flag.memory.healer = creepName;
        return;
    }
    roleHealer.run(healer, flag);
}
function manageRemoteProtection(flag) {
    var protector = _.find(Game.creeps, function (creep) { return flag.memory.protector && creep.name == flag.memory.protector; });
    if (!protector) {
        var originSpawn = Game.spawns[flag.memory.spawn];
        var creepName = originSpawn.createCreep(BodyCalulator.getProtectorBody(originSpawn.room), null, { role: "protector" });
        flag.memory.protector = creepName;
        return;
    }
    roleProtector.run(protector, flag);
}
function manageRemoteMining(flag) {
    var originSpawn = Game.spawns[flag.memory.spawn];
    var roomSources = flag.room.find(FIND_SOURCES);
    var _loop_1 = function (source) {
        if (!_.any(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "harvester"; })) {
            console.log("make remote harverster" + source.id);
            originSpawn.createCreep(BodyCalulator.getHarvesterBody(originSpawn.room), null, { role: "harvester", sourceid: source.id, room: flag.room.name });
            return { value: void 0 };
        }
        else if (_.filter(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "mule"; }).length < 2) {
            console.log("make remote mule" + source.id);
            originSpawn.createCreep(BodyCalulator.getMuleBody(originSpawn.room), null, { role: "mule", sourceid: source.id, room: flag.room.name });
            return { value: void 0 };
        }
    };
    for (var _i = 0, roomSources_1 = roomSources; _i < roomSources_1.length; _i++) {
        var source = roomSources_1[_i];
        var state_1 = _loop_1(source);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function manageCapturer(flag) {
    var MINUMNCOSTCAPTURER = 650;
    var capturer = _.find(Game.creeps, function (creep) { return flag.memory.capturer && creep.name == flag.memory.capturer; });
    if (!capturer) {
        var originSpawn = Game.spawns[flag.memory.spawn];
        if (originSpawn.room.energyAvailable >= MINUMNCOSTCAPTURER) {
            var creepName = originSpawn.createCreep(BodyCalulator.getCapturerBody(originSpawn.room), null, { role: "capturer" });
            flag.memory.capturer = creepName;
        }
        else {
            console.log("cant afford capturer, " + (MINUMNCOSTCAPTURER - originSpawn.room.energyCapacityAvailable) + " short");
        }
        return;
    }
    roleCapturer.run(capturer, flag);
}
function manageBuilder(flag) {
    var builder = _.find(Game.creeps, function (creep) { return flag.memory.builder && creep.name == flag.memory.builder; });
    var constructions = flag.room.find(FIND_CONSTRUCTION_SITES);
    if (!builder && constructions) {
        var originSpawn = Game.spawns["OriginSpawn"];
        var creepName = originSpawn.createCreep(BodyCalulator.getBuilderBody(originSpawn.room), null, { role: "builder", room: flag.room });
        flag.memory.builder = creepName;
        return;
    }
    roleBuilder.run(builder, flag);
}
module.exports = {
    run: function (flag) {
        if (flag.memory.type != "remote_ops")
            return;
        if (flag.room) {
            manageBuilder(flag);
            manageRemoteMining(flag);
        }
        if (flag.room && flag.room.controller.my) {
            manageUpgrading(flag);
        }
        else {
            manageCapturer(flag);
        }
        manageRemoteHealing(flag);
        manageRemoteProtection(flag);
    }
};
