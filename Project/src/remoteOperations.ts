import BodyCalulator = require('./helpers/bodyCalculator');
import roleCapturer = require('./roles/capturer');
import roleBuilder = require('./roles/builder');
import roleProtector = require('./roles/protector');

export = {
    run: function (flag: Flag) {
        if (flag.memory.type != "remote_mining")
            return;

        if (flag.room) {
            manageBuilder(flag);
            manageRemoteMining(flag);
        }
        
        manageCapturer(flag);
        manageRemoteProtection(flag)
    }
}

function manageRemoteProtection(flag: Flag) {
    var protector = _.find(Game.creeps, (creep: Creep) => flag.memory.protector && creep.name == flag.memory.protector);

    if (!protector) {
        var originSpawn = Game.spawns["OriginSpawn"];

        var creepName = originSpawn.createCreep(BodyCalulator.getProtectorBody(originSpawn.room), null, { role: "protector" });
        flag.memory.protector = creepName;
        return;
    }

    roleProtector.run(protector, flag);
}

function manageRemoteMining(flag: Flag) {
    var originSpawn = Game.spawns["OriginSpawn"];
    var roomSources = flag.room.find<Source>(FIND_SOURCES);

    for (let source of roomSources) {
        if (!_.any(Game.creeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "harvester")) {
            console.log("make remote harverster" + source.id);
            originSpawn.createCreep(BodyCalulator.getHarvesterBody(originSpawn.room), null, { role: "harvester", sourceid: source.id });
            return;
        }
        else if (_.filter(Game.creeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "mule").length < 2) {
            console.log("make remote mule" + source.id);
            originSpawn.createCreep(BodyCalulator.getMuleBody(originSpawn.room), null, { role: "mule", sourceid: source.id });
            return;
        }
    }
}

function manageCapturer(flag: Flag) {
    const MINUMNCOSTCAPTURER = 650;

    var capturer = _.find(Game.creeps, (creep: Creep) => flag.memory.capturer && creep.name == flag.memory.capturer);

    if (!capturer) {
        var originSpawn = Game.spawns["OriginSpawn"];
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

        var creepName = originSpawn.createCreep(BodyCalulator.getBuilderBody(originSpawn.room), null, { role: "builder" });
        flag.memory.builder = creepName;
        return;
    }

    roleBuilder.run(builder, flag);
}