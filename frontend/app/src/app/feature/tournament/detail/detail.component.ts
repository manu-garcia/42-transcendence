import { Component, OnInit } from '@angular/core';

import { IEvent } from 'shared/event/event';

@Component({
  selector: 'app-tournament-detail-screen',
  templateUrl: './detail.component.html',
})
export class TournamentDetailScreenComponent implements OnInit {
  public event: IEvent;

  ngOnInit() {
    this.event = history.state.event;
  }
}
