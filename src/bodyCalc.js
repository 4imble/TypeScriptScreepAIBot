"use strict";
var bodyCalc = {
    getWorker: function (room) {
        var desiredCost = room.find(FIND_MY_CREEPS).length == 0 ? room.energyAvailable : (room.energyCapacityAvailable * 0.8);
        if (room.memory.storedCapacityAvailable == desiredCost) {
            return room.memory.bestBody;
        }
        var body = [WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE];
        while (bodyCost(body) > desiredCost) {
            body = _.dropRight(body);
        }
        room.memory.bestBody = body;
        room.memory.storedCapacityAvailable = desiredCost;
        return body;
    },
    getWarrior: function (room) {
        var desiredCost = room.find(FIND_MY_CREEPS).length == 0 ? room.energyAvailable : room.energyCapacityAvailable;
        if (room.memory.storedCapacityAvailable == desiredCost) {
            return room.memory.bestWarrior;
        }
        var body = [ATTACK, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE];
        while (bodyCost(body) > desiredCost) {
            body = _.dropRight(body);
        }
        room.memory.bestWarrior = body;
        room.memory.storedCapacityAvailable = desiredCost;
        return body;
    }
};
function bodyCost(body) {
    return _.sum(body.map(function (b) { return BODYPART_COST[b]; }));
}
module.exports = bodyCalc;
