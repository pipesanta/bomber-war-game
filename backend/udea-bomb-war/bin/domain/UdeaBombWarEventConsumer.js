"use strict";

const Rx = require("rxjs");
const broker = require("../tools/broker/BrokerFactory")();
const MATERIALIZED_VIEW_TOPIC = "materialized-view-updates";
const UdeaBombWarDA = require("../data/UdeaBombWar")

/**
 * Singleton instance
 */
let instance;

class UserEventConsumer {
    constructor() { }
    
    handlenewPlayerArrived$({data}){
        return broker.send$(MATERIALIZED_VIEW_TOPIC, 'playerUpdated', data)
    }
}

module.exports = () => {
    if (!instance) {
        instance = new UserEventConsumer();
        console.log(`${instance.constructor.name} Singleton created`);
    }
    return instance;
};