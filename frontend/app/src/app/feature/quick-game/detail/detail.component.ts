import { Component, OnInit } from '@angular/core';

import { IEvent } from 'shared/event/event';

@Component({
  selector: 'app-quick-game-detail-screen',
  templateUrl: './detail.component.html',
})
export class QuickGameDetailScreenComponent implements OnInit {
  public event: IEvent;

  ngOnInit() {
    this.event = history.state.event;
  }
}
