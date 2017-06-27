class BodyCalculator {
    getHarvesterBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, WORK, WORK, WORK, WORK, WORK];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getMuleBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getWorkerBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, CARRY, WORK, WORK, WORK, WORK, WORK, CARRY];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getCapturerBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, CLAIM, CLAIM, MOVE];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    calculateCost = (body: string[]): number => {
        return _.sum(body.map((b) => BODYPART_COST[b]));
    }

    private makeBestBodyCurrentlyPossible(room: Room, bodyTemplate: string[]): string[] {
        var desiredCost = room.find(FIND_MY_CREEPS).length < 3 ? SPAWN_ENERGY_CAPACITY : room.energyCapacityAvailable;

        while (this.calculateCost(bodyTemplate) > desiredCost) {
            bodyTemplate = _.dropRight(bodyTemplate);
        }

        return bodyTemplate.reverse();
    }
}

export = new BodyCalculator();