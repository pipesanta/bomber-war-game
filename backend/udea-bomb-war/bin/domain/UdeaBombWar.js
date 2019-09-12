"use strict";

const Rx = require("rxjs");
const eventSourcing = require("../tools/EventSourcing")();
const Event = require("@nebulae/event-store").Event;
const UdeaBombWarDA = require("../data/UdeaBombWar");
const uuidv4 = require('uuid/v4');


/**
 * Singleton instance
 */
let instance;

class UdeaBombWar {
  constructor() {
  }


  loginToGame$({ args, jwt }, authToken) {
    const player = {
      code: 200,
      user_id: uuidv4(),
      character: Math.floor((Math.random()) * 30) + 1,
    }
    return eventSourcing.eventStore.emitEvent$(
      new Event({
        eventType: "newPlayerArrived",
        eventTypeVersion: 1,
        aggregateType: "Player",
        aggregateId: Date.now(),
        data: player,
        user: authToken.preferred_username
      })
    )
      .map(r => player)
      .mergeMap(rawResponse => this.buildSuccessResponse$(rawResponse))
      .catch(err => this.errorHandler$(err));
  }


  notifyPlayerUpdates$({ args, jwt }, authToken) {
    const player = {
      code: 200,
      user_id: args.id,
      xPosition: args.x,
      yPosition: args.y

    }
    return eventSourcing.eventStore.emitEvent$(
      new Event({
        eventType: "newPlayerArrived",
        eventTypeVersion: 1,
        aggregateType: "Player",
        aggregateId: Date.now(),
        data: player,
        user: authToken.preferred_username
      })
    )
      .map(r => ({code: 200}))
      .mergeMap(rawResponse => this.buildSuccessResponse$(rawResponse))
      .catch(err => this.errorHandler$(err));
  }



  //#region  mappers for API responses
  errorHandler$(err) {
    return Rx.Observable.of(err)
      .map(err => {
        const exception = { data: null, result: {} };
        const isCustomError = err instanceof CustomError;
        if (!isCustomError) {
          err = new DefaultError(err)
        }
        exception.result = {
          code: err.code,
          error: { ...err.getContent() }
        }
        return exception;
      });
  }


  buildSuccessResponse$(rawRespponse) {
    return Rx.Observable.of(rawRespponse)
      .map(resp => {
        return {
          data: resp,
          result: {
            code: 200
          }
        }
      });
  }

  //#endregion


}

module.exports = () => {
  if (!instance) {
    instance = new UdeaBombWar();
    console.log(`${instance.constructor.name} Singleton created`);
  }
  return instance;
};
