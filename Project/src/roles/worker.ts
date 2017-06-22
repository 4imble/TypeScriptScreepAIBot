export = {
    run: function (creep: Creep) {
        var controller = creep.room.controller;
        var storage = controller.pos.findInRange<Container>(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        var tower = _.find(creep.room.find<Tower>(FIND_STRUCTURES), (struct: Tower) => struct.structureType == STRUCTURE_TOWER);

        if (creep.carry.energy == creep.carryCapacity) {
            if (tower.energy < tower.energyCapacity)
                creep.memory.job = "tower_refilling";
            else {
                creep.memory.job = "upgrading";
            }
        }

        if (creep.memory.job == "upgrading") {
            upgradeController(creep, controller);
        }

        else if (creep.memory.job == "tower_refilling") {
            refillTower(creep, tower);
        }

        else if (storage) {
            collectFromStorage(creep, storage);
        }
    }
};

function upgradeController(creep, controller) {
    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }

    if (creep.carry.energy == 0)
        creep.memory.job = "collecting";
}

function refillTower(creep, tower) {
    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(tower, { visualizePathStyle: { stroke: '#ffffff' } });
    }

    if (creep.carry.energy == 0)
        creep.memory.job = "collecting";
}

function collectFromStorage(creep, storage) {
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}