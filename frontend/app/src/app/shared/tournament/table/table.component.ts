import { Component, OnInit, OnDestroy } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Observable } from 'rxjs';

import { ITournament } from 'shared/tournament/tournament';
import { TournamentService } from 'shared/tournament/tournament.service';
import { TournamentFormComponent } from 'shared/tournament/form/form.component';

import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './table.component.html',
})
export class TournamentTableComponent implements OnInit, OnDestroy {
  public tournaments$: Observable<ITournament[]>;
  public tournamentFormComponentRef: DynamicDialogRef | undefined;

  constructor(private tournamentService: TournamentService, private dialogService: DialogService, private languageService: LanguageService, private translateService: TranslateService) { }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.getTournaments();
    this.languageService.initializeLanguage();
  }

  ngOnDestroy() {
    if (this.tournamentFormComponentRef) {
      this.tournamentFormComponentRef.close();
    }
  }

  public createTournament(): void {
    this.openTournamentFormDialog();
  }

  public editTournament(tournament: ITournament): void {
    this.openTournamentFormDialog(tournament);
  }

  private openTournamentFormDialog(tournament: ITournament = null): void {
    this.tournamentFormComponentRef = this.dialogService.open(TournamentFormComponent, {
      header: this.translateService.instant('general.tournament.list.create.tournament'),
      width: '50vw',
      data: {
        tournament,
      },
    });

    this.tournamentFormComponentRef.onClose.subscribe((data: any) => {
      this.tournaments$ = this.tournamentService.getTournaments();
    });
  }
}
