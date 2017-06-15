import bodyCalc = require("./bodyCalc");

var spawnManager = {
    run: function() {
    
        let spawn:Spawn = Game.spawns['OriginSpawn'];
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log(`Harvesters: ${harvesters.length}, Upgraders: ${upgraders.length}, Builders: ${builders.length}`);
        
        var body = bodyCalc.getBody(spawn.room);
        if(spawn.canCreateCreep(body) == 0)
        {
            var sources = spawn.room.find(FIND_SOURCES);
            var randomSource = Math.floor((Math.random() * sources.length));
            spawn.createCreep(body, undefined, {role: 'gatherer', source: randomSource });
        }
        else{
            console.log(spawn.canCreateCreep(body));
        }



        // if(harvesters.length < 5) {
        //     var newName = spawn.createCreep(body, undefined, {role: 'harvester'});
        // }
        
        // if(upgraders.length < 7) {
        //     var newName = spawn.createCreep(body, undefined, {role: 'upgrader'});
        // }
        
        // if(builders.length < 4) {
        //     var newName = spawn.createCreep(body, undefined, {role: 'builder'});
        // }
    
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

export = spawnManager;