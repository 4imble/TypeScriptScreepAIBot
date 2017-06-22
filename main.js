"use strict";
var roleHarvester = require("./harvester");
var roleMule = require("./mule");
var roleWorker = require("./worker");
var SpawnManager = require("./spawnManager");
var TowerManager = require("./towerManager");
module.exports = {
    loop: function () {
        var myRooms = _.filter(Game.rooms, function (room) { return room.controller.my; });
        var myCreeps = _.filter(Game.creeps, function (creep) { return creep.my; });
        _.each(myCreeps, function (creep) {
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'mule') {
                roleMule.run(creep);
            }
            if (creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
        });
        _.each(myRooms, function (room) {
            SpawnManager.run(room);
            TowerManager.run(room);
        });
    }
};
