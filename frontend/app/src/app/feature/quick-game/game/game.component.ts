import { Component, OnInit } from '@angular/core';
import { IEventMatch, IEvent } from 'shared/event/event';
import { GameService } from 'shared/game/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quick-game-screen',
  templateUrl: './game.component.html',
})
export class GameScreenComponent implements OnInit {
  public eventMatch$: Observable<IEventMatch>;
  public eventPruebas: IEvent;
  // Select here: TRUE = 2v2, FALSE = 1v1
  multiplayer: boolean = true;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // MODIFICAR EL SIGUIENTE ID!!!! TIENE QUE ESTAR CREADO UN EVENTO
    // Y TIENE QUE TENER MATCHES!!
    this.eventPruebas = { id: 3 } as IEvent;

    this.eventMatch$ = this.gameService.getMatch(this.eventPruebas);
  }
}
