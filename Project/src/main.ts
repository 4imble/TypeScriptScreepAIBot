import roleHarvester = require('./roles/harvester');
import roleMule = require('./roles/mule');
import spawnManager = require('./spawnManager');

export = {
    loop: () => {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'mule') {
                roleMule.run(creep);
            }
        }

        spawnManager.run();
    }
}