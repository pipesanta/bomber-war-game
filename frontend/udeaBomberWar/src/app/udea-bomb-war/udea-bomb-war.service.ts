import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { GatewayService } from '../api/gateway.service';
import {
  getAllMessages,
  sendMessage,
  onMessageArriveSubscription
} from './gql/udeaBombWar.js';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UdeaBombWarService {

  screenSizeChanged$ = new BehaviorSubject(undefined);
  commands$ = new BehaviorSubject(undefined);

  constructor(
     private gateway: GatewayService
  ) {

   }

   getAllMessages$() {
    return this.gateway.apollo
      .query<any>({
        query: getAllMessages,
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      });
  }

  sendMessage$(message: string){
    return this.gateway.apollo
    .mutate<any>({
      mutation: sendMessage,
      variables: {
        msg: message
      },
      errorPolicy: 'all'
    });
  }

  listenMessageArrive$(){
    return this.gateway.apollo
    .subscribe({
      query: onMessageArriveSubscription
    });
  }

  publishSizeChangedEvent(width, height){
    this.screenSizeChanged$.next({width, height})
  }


}
