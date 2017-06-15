var spawnManager = {
    run: function() {
    
        let spawn = Game.spawns['OriginSpawn'];
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log(`Harvesters: ${harvesters.length}, Upgraders: ${upgraders.length}, Builders: ${builders.length}`);
    
        if(harvesters.length < 5) {
            var newName = spawn.createCreep([WORK,CARRY,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,CARRY], undefined, {role: 'harvester'});
        }
        
        if(upgraders.length < 7) {
            var newName = spawn.createCreep([WORK,CARRY,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,CARRY], undefined, {role: 'upgrader'});
        }
        
        if(builders.length < 4) {
            var newName = spawn.createCreep([WORK,CARRY,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,CARRY], undefined, {role: 'builder'});
        }
    
        if(spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};

module.exports = spawnManager;