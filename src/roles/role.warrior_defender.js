"use strict";
module.exports = {
    run: function (creep) {
        var waitFlag = creep.room.find(FIND_FLAGS, {
            filter: function (structure) {
                return structure.name == "WarriorWait";
            }
        })[0];
        creep.moveTo(waitFlag, { visualizePathStyle: { stroke: '#f4ee42' } });
    }
};
