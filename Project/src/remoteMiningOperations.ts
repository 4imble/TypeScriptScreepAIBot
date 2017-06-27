import BodyCalulator = require('./helpers/bodyCalculator');
import roleCapturer = require('./roles/capturer');

export = {
    run: function (flag: Flag) {
        if (flag.memory.type != "remote_mining")
            return;

        manageCapturer(flag);

        if (flag.room) {
            manageRemoteMining(flag.room);
        }
    }
}

function manageRemoteMining(room: Room) {
    var originSpawn = Game.spawns["OriginSpawn"];
    var roomSources = room.find<Source>(FIND_SOURCES);

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
        if (originSpawn.room.energyCapacityAvailable >= MINUMNCOSTCAPTURER) {
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