import BodyCalulator = require('./helpers/bodyCalculator');
import roleCapturer = require('./roles/capturer');
import roleBuilder = require('./roles/builder');
import roleProtector = require('./roles/protector');
import roleHealer = require('./roles/healer');

export = {
    run: function (flag: Flag) {
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
}

function manageUpgrading(flag: Flag) {
    var spawn = _.find(Game.spawns, (spawn) => spawn.room == flag.room);
    if(spawn)
        flag.remove();

    if (_.filter(Game.creeps, (creep:Creep) => creep.memory.room == flag.room.name && creep.memory.role == "worker").length < 3) {
        var originSpawn = Game.spawns[flag.memory.spawn];
        console.log("remote worker");
        originSpawn.createCreep(BodyCalulator.getWorkerBody(originSpawn.room), null, { role: "worker", job: "requesting_energy", room: flag.room.name });
    }
}

function manageRemoteHealing(flag: Flag) {
    var healer = _.find(Game.creeps, (creep: Creep) => flag.memory.healer && creep.name == flag.memory.healer);

    if (!healer) {
        var originSpawn = Game.spawns[flag.memory.spawn];
        var creepName = originSpawn.createCreep(BodyCalulator.getHealerBody(originSpawn.room), null, { role: "healer" });
        flag.memory.healer = creepName;
        return;
    }

    roleHealer.run(healer, flag);
}

function manageRemoteProtection(flag: Flag) {
    var protector = _.find(Game.creeps, (creep: Creep) => flag.memory.protector && creep.name == flag.memory.protector);

    if (!protector) {
        var originSpawn = Game.spawns[flag.memory.spawn];

        var creepName = originSpawn.createCreep(BodyCalulator.getProtectorBody(originSpawn.room), null, { role: "protector" });
        flag.memory.protector = creepName;
        return;
    }

    roleProtector.run(protector, flag);
}

function manageRemoteMining(flag: Flag) {
    var originSpawn = Game.spawns[flag.memory.spawn];
    var roomSources = flag.room.find<Source>(FIND_SOURCES);

    for (let source of roomSources) {
        if (!_.any(Game.creeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "harvester")) {
            console.log("make remote harverster" + source.id);
            originSpawn.createCreep(BodyCalulator.getHarvesterBody(originSpawn.room), null, { role: "harvester", sourceid: source.id, room: flag.room.name });
            return;
        }
        else if (_.filter(Game.creeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "mule").length < 2) {
            console.log("make remote mule" + source.id);
            originSpawn.createCreep(BodyCalulator.getMuleBody(originSpawn.room), null, { role: "mule", sourceid: source.id, room: flag.room.name });
            return;
        }
    }
}

function manageCapturer(flag: Flag) {
    const MINUMNCOSTCAPTURER = 650;

    var capturer = _.find(Game.creeps, (creep: Creep) => flag.memory.capturer && creep.name == flag.memory.capturer);

    if (!capturer) {
        var originSpawn = Game.spawns[flag.memory.spawn];
        if (originSpawn.room.energyAvailable >= MINUMNCOSTCAPTURER) {
            var creepName = originSpawn.createCreep(BodyCalulator.getCapturerBody(originSpawn.room), null, { role: "capturer" });
            flag.memory.capturer = creepName;
        }
        else {
            console.log(`cant afford capturer, ${MINUMNCOSTCAPTURER - originSpawn.room.energyCapacityAvailable} short`);
        }
        return;
    }

    roleCapturer.run(capturer, flag);
}

function manageBuilder(flag: Flag) {
    var builder = _.find(Game.creeps, (creep: Creep) => flag.memory.builder && creep.name == flag.memory.builder);
    var constructions = flag.room.find<ConstructionSite>(FIND_CONSTRUCTION_SITES);

    if (!builder && constructions) {
        var originSpawn = Game.spawns["OriginSpawn"];

        var creepName = originSpawn.createCreep(BodyCalulator.getBuilderBody(originSpawn.room), null, { role: "builder", room: flag.room });
        flag.memory.builder = creepName;
        return;
    }

    roleBuilder.run(builder, flag);
}