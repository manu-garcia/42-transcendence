import { Component, Input } from '@angular/core';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent {
  @Input() users: IUser[];
}
