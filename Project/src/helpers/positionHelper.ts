class PositionHelper {
    constructor() { }

    inverseDirection = (direction: number): number => {
        return direction <= 4 ? direction + 4 : direction - 4;
    };

    getPosInverseToOrigin = (origin: RoomPosition, source: RoomPosition): RoomPosition => {
        var xdiff = origin.x - source.x;
        var ydiff = origin.y - source.y;

        return new RoomPosition(origin.x + xdiff, origin.y + ydiff, origin.roomName);
    }

    areSameLocation = (thing1: Structure|Creep, thing2: Structure|Creep): boolean => {
        if(!thing1 || !thing2)
            return false;

        return thing1.pos.toString() == thing2.pos.toString();
    }
}

export = new PositionHelper();