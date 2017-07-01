"use strict";
var BodyCalculator = (function () {
    function BodyCalculator() {
        var _this = this;
        this.getHarvesterBody = function (room) {
            var bodyTemplate = [MOVE, WORK, WORK, WORK, WORK, WORK];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getMuleBody = function (room) {
            var bodyTemplate = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getWorkerBody = function (room) {
            var bodyTemplate = [MOVE, CARRY, WORK, WORK, WORK, WORK, WORK, CARRY];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getCapturerBody = function (room) {
            var bodyTemplate = [MOVE, CLAIM, CLAIM, MOVE];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getBuilderBody = function (room) {
            var bodyTemplate = [MOVE, WORK, CARRY, WORK, CARRY, MOVE, WORK, CARRY, MOVE];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getProtectorBody = function (room) {
            var bodyTemplate = [MOVE, RANGED_ATTACK, ATTACK, RANGED_ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, TOUGH, MOVE, TOUGH, MOVE, MOVE];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.getHealerBody = function (room) {
            var bodyTemplate = [MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE];
            return _this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
        };
        this.calculateCost = function (body) {
            return _.sum(body.map(function (b) { return BODYPART_COST[b]; }));
        };
    }
    BodyCalculator.prototype.makeBestBodyCurrentlyPossible = function (room, bodyTemplate) {
        var desiredCost = room.find(FIND_MY_CREEPS).length < 3 ? SPAWN_ENERGY_CAPACITY : room.energyCapacityAvailable;
        while (this.calculateCost(bodyTemplate) > desiredCost && this.calculateCost(bodyTemplate) % 2 == 0) {
            bodyTemplate = _.dropRight(bodyTemplate);
        }
        return bodyTemplate.reverse();
    };
    return BodyCalculator;
}());
module.exports = new BodyCalculator();
