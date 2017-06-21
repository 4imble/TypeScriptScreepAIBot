import bodyCalc = require("./bodyCalc");

var spawnManager = {
    run: function () {

        let spawn: Spawn = Game.spawns['OriginSpawn'];

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        var roomEnergy = _.sum(_.map(spawn.room.find(FIND_SOURCES), (source: Source) => source.energy));

        if (roomEnergy < 1000 && spawn.memory.warbuilding != true) {
            let spawn: Spawn = Game.spawns['OriginSpawn'];
            spawn.memory.warbuilding = true;
            spawn.memory.warriors = 0;
        }

        console.log("warbuilding: " + spawn.memory.warbuilding);
        // console.log("army count: " + spawn.memory.warriors);
        // console.log("army: " + army);

        if (spawn.memory.warbuilding != true) {
            var body = bodyCalc.getWorker(spawn.room);
            console.log(`attempting to make worker`);
            if (spawn.canCreateCreep(body) == 0) {
                var sources = spawn.room.find(FIND_SOURCES);
                var randomSource = Math.floor((Math.random() * sources.length));
                spawn.createCreep(body, undefined, { role: 'gatherer', source: randomSource });
            }
        }
        else {
            console.log(`attempting to make warrior`);
            var body = bodyCalc.getWarrior(spawn.room);
            if (spawn.canCreateCreep(body) == 0) {
                spawn.memory.warriors += 1;
                spawn.createCreep(body, undefined, { role: 'warrior_defender' });
            }
            if (spawn.memory.warriors >= 6) {
                setTimeout(sendArmyToAttack(), 120000);
                spawn.memory.warbuilding = false;
                spawn.memory.warriors = 0;
            }
        }
    }
};

function sendArmyToAttack() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'warrior_defender') {
            creep.memory.role = "warrior_attacker";
            console.log(`${name} now attacking`);
        }
    }

}

export = spawnManager;