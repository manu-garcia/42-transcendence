import { Component, Input } from '@angular/core';

import { ITournament } from 'shared/tournament/tournament';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './table.component.html',
})
export class TournamentTableComponent {
  @Input() tournaments: ITournament[];
}
