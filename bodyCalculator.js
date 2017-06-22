"use strict";
var BodyCalculator = (function () {
    function BodyCalculator() {
        var _this = this;
        this.getHarvesterBody = function (room) {
            var bodyTemplate = [MOVE, WORK, WORK, WORK, WORK, WORK];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getMuleBody = function (room) {
            var bodyTemplate = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getWorkerBody = function (room) {
            var bodyTemplate = [MOVE, CARRY, WORK, WORK, WORK, WORK, WORK];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.calculateCost = function (body) {
            return _.sum(body.map(function (b) { return BODYPART_COST[b]; }));
        };
    }
    BodyCalculator.prototype.makeBestBodyCurrentlyPossible = function (room, bodyTemplate) {
        var desiredCost = room.find(FIND_MY_CREEPS).length == 0 ? room.energyAvailable : room.energyCapacityAvailable;
        while (this.calculateCost(bodyTemplate) > desiredCost) {
            bodyTemplate = _.dropRight(bodyTemplate);
        }
        return bodyTemplate.reverse();
    };
    return BodyCalculator;
}());
module.exports = new BodyCalculator();
