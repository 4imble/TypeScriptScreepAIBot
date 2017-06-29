"use strict";
module.exports = {
    run: function (creep, flag) {
        if (creep.room != flag.room) {
            creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        else if (creep.room.controller) {
            if (flag.color == COLOR_GREEN) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};
