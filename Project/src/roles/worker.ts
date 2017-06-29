export = {
    run: function (creep: Creep) {
        var room = Game.rooms[creep.memory.room];
        var controller = room.controller;
        var storage = controller.pos.findInRange<Storage>(FIND_STRUCTURES, 5, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        var emptyTower = _.find(room.find<Tower>(FIND_STRUCTURES), (struct: Tower) => struct.structureType == STRUCTURE_TOWER && struct.energy < struct.energyCapacity);
        var construction = controller.pos.findClosestByRange<ConstructionSite>(FIND_CONSTRUCTION_SITES);

        creep.moveTo(controller, { visualizePathStyle: { stroke: '#9af441' } });
        calulateJob(creep, emptyTower, construction, storage);

        if (creep.memory.job == "upgrading") {
            upgradeController(creep, controller, storage);
        }

        else if (creep.memory.job == "constructing") {
            constructStructure(creep, construction);
        }

        else if (creep.memory.job == "tower_refilling") {
            refillTower(creep, emptyTower, storage);
        }

        else if (storage) {
            collectFromStorage(creep, storage);
        }
    }
};

function calulateJob(creep: Creep, emptyTower: Tower, construction: ConstructionSite, storage: Storage) {
    if (creep.carry.energy == creep.carryCapacity || (!storage && construction)) {
        if (construction)
            creep.memory.job = "constructing";
        else if (emptyTower)
            creep.memory.job = "tower_refilling";
        else
            creep.memory.job = "upgrading";
    }
}

function constructStructure(creep, construction) {
    if (creep.build(construction) == ERR_NOT_IN_RANGE) {
        creep.moveTo(construction, { visualizePathStyle: { stroke: '#9af441' } });
    }

    if (creep.carry.energy == 0)
        creep.memory.job = "requesting_energy";
}

function upgradeController(creep, controller, storage) {
    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = storage ? "collecting" : "requesting_energy";
}

function refillTower(creep, emptyTower, storage) {
    if (creep.transfer(emptyTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(emptyTower, { visualizePathStyle: { stroke: '#ffffff' } });
    }

    if (creep.carry.energy == 0)
        creep.memory.job = storage ? "collecting" : "requesting_energy";
}

function collectFromStorage(creep, storage) {
    if (creep.memory.job == "requesting_energy")
        return;

    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}