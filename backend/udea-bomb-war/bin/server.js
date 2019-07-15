'use strict'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const eventSourcing = require('./tools/EventSourcing')();
const eventStoreService = require('./services/event-store/EventStoreService')();
const mongoDB = require('./data/MongoDB').singleton();
const UdeaBombWarDA = require('./data/UdeaBombWar');
const graphQlService = require('./services/gateway/GraphQlService')();
const Rx = require('rxjs');

const start = () => {
    Rx.Observable.concat(
        eventSourcing.eventStore.start$(),
        eventStoreService.start$(),
        mongoDB.start$(),
        UdeaBombWarDA.start$(),
        graphQlService.start$()
    ).subscribe(
        (evt) => {
        },
        (error) => {
            console.error('Failed to start', error);
            process.exit(1);
        },
        () => console.log('udea-bom-war started')
    );
};

start();



