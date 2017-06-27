"use strict";
module.exports = {
    gotoAndDo: function (creep, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (action(args) == ERR_NOT_IN_RANGE) {
            creep.moveTo(args[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};
