"use strict";
var bodyCalc = require("./bodyCalc");
var spawnManager = {
    run: function () {
        var spawn = Game.spawns['OriginSpawn'];
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
        var harvesters = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'harvester'; });
        var upgraders = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'upgrader'; });
        var builders = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'builder'; });
        console.log("Harvesters: " + harvesters.length + ", Upgraders: " + upgraders.length + ", Builders: " + builders.length);
        var body = bodyCalc.getBody(spawn.room);
        if (spawn.canCreateCreep(body) == 0) {
            var sources = spawn.room.find(FIND_SOURCES);
            var randomSource = Math.floor((Math.random() * sources.length));
            spawn.createCreep(body, undefined, { role: 'gatherer', source: randomSource });
        }
        else {
            console.log(spawn.canCreateCreep(body));
        }
        if (spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text('🛠️' + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, { align: 'left', opacity: 0.8 });
        }
    }
};
module.exports = spawnManager;
