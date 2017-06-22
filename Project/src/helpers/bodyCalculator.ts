class BodyCalculator {
    getHarvesterBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, WORK, WORK, WORK, WORK, WORK];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getMuleBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    calculateCost = (body: string[]): number => {
        return _.sum(body.map((b) => BODYPART_COST[b]));
    }

    private makeBestBodyCurrentlyPossible(room: Room, bodyTemplate: string[]): string[] {
        var desiredCost = room.find(FIND_MY_CREEPS).length == 0 ? room.energyAvailable : room.energyCapacityAvailable;

        while (this.calculateCost(bodyTemplate) > desiredCost) {
            bodyTemplate = _.dropRight(bodyTemplate);
        }

        return bodyTemplate.reverse();
    }
}

export = new BodyCalculator();