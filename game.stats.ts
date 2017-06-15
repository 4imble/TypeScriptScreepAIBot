var gameStats = {
    run: function (room: Room) {
        for (var name in Game.rooms) {
            var room = Game.rooms[name];
            var thingsToBuild = room.find(FIND_CONSTRUCTION_SITES);
            var sources = room.find(FIND_SOURCES);
            
            console.log(`Room: ${name}, Buildings: ${thingsToBuild.length}, Sources: ${sources.length}`);
        }
    }
};

export = gameStats;