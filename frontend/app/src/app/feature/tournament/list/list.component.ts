import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ITournament } from 'shared/tournament/tournament';
import { TournamentService } from 'shared/tournament/tournament.service';

@Component({
  selector: 'app-tournament-list-screen',
  templateUrl: './list.component.html',
})
export class TournamentListScreenComponent implements OnInit {
  public tournaments$: Observable<ITournament[]>;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.tournaments$ = this.tournamentService.getTournaments();
  }
}
