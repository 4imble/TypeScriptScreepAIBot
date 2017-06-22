export = {
    run: function (creep: Creep) {
        var waitFlag:Flag = creep.room.find<Flag>(FIND_FLAGS, {
                    filter: (structure:Flag) => {
                        return structure.name == "WarriorWait";
                    }})[0];

        creep.moveTo(waitFlag, {visualizePathStyle: {stroke: '#f4ee42'}});
    }
};