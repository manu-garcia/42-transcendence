import { Component, OnInit } from '@angular/core';

import { IUser } from 'shared/user/user';

import { IEventMatch, IEvent, IEventGroup, EEventType } from 'shared/event/event';

@Component({
  selector: 'app-quick-game-screen',
  templateUrl: './game.component.html',
})
export class GameScreenComponent implements OnInit {
  public eventMatch: IEventMatch;

  constructor() {}

  ngOnInit() {
    this.initializeEventMatch();
  }

  // Initialize EventMatch
  initializeEventMatch() {
    const event: IEvent = {
      id: 1,
      name: 'Sample Event',
      played: false,
      type: EEventType.QUICK_GAME,
      winnerEventGroupId: 0,
    };

    const group1: IEventGroup = {
      id: 1,
      event: event,
      maxUsers: 2,
      users: [
        {
          id: '1',
          username: 'andoni',
          first_name: 'Andoni',
          last_name: 'Transcendence',
          profile_pic: 'path/to/profile_pic1.jpg'
        } as IUser,
        {
          id: '2',
          username: 'diego',
          first_name: 'Diego',
          last_name: 'Transcendence',
          profile_pic: 'path/to/profile_pic2.jpg'
        } as IUser
      ]
    };

    const group2: IEventGroup = {
      id: 2,
      event: event,
      maxUsers: 2,
      users: [
        {
          id: '3',
          username: 'carlos',
          first_name: 'Carlos',
          last_name: 'Transcendence',
          profile_pic: 'path/to/profile_pic3.jpg'
        } as IUser,
        {
          id: '4',
          username: 'manu',
          first_name: 'Manu',
          last_name: 'Transcendence',
          profile_pic: 'path/to/profile_pic4.jpg'
        } as IUser
      ]
    };

    this.eventMatch = {
      id: 1,
      event: event,
      group1: group1,
      group2: group2,
      played: false,
      pointsDelta: 0,
      winnerEventMatchGroupId: 0,
    };
  }
}
