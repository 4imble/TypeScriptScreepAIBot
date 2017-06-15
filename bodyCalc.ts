var bodyCalc = {
    getBody: function (room: Room) {
        var desiredCost = room.find(FIND_MY_CREEPS).length == 0 ? room.energyAvailable : room.energyCapacityAvailable;
        
        if(room.memory.storedCapacityAvailable == desiredCost)
        {
            console.log("BODY Old: " + room.memory.storedCapacityAvailable);
            console.log("BODY Old: " + room.energyCapacityAvailable);
            console.log("BODY Old: " + desiredCost);
            console.log("BODY Old: " + room.memory.bestBody);
            return room.memory.bestBody;
        }


        var body = [WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE];

        while(bodyCost(body) > desiredCost) {
            body = _.dropRight(body);
        }

        console.log("BODY New: " + body);
        room.memory.bestBody = body;
        room.memory.storedCapacityAvailable = desiredCost;
        return body;
    }


}
function bodyCost(body) {
    return _.sum(body.map((b) => BODYPART_COST[b]));
}
export = bodyCalc;