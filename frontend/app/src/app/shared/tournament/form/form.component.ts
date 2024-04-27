import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subscription } from 'rxjs';

import { ITournament } from 'shared/tournament/tournament';
import { TournamentService } from 'shared/tournament/tournament.service';

@Component({
  selector: 'app-tournament-form',
  templateUrl: './form.component.html',
})
export class TournamentFormComponent implements OnInit, OnDestroy {
  @Input() tournament: ITournament;
  @Output() onTournamentSaved: EventEmitter<ITournament> = new EventEmitter<ITournament>();

  public form: FormGroup;

  private saveSubscription$: Subscription;

  constructor(
    private tournamentService: TournamentService,
    public dialogConfig: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef
  ) {
    // If called within a dialog
    if (this.dialogConfig?.data?.tournament) {
      this.tournament = this.dialogConfig.data.tournament;
    }
  }

  public ngOnInit() {
    this.form = this.buildForm(this.tournament);
  }

  ngOnDestroy() {
    if (this.saveSubscription$) {
      this.saveSubscription$.unsubscribe();
      this.saveSubscription$ = null;
    }
  }

  public save(): void {
    if (this.saveSubscription$) {
      this.saveSubscription$.unsubscribe();
      this.saveSubscription$ = null;
    }

    this.saveSubscription$ = this.tournamentService
      .saveTournament(this.form.value)
      .subscribe((savedTournament: ITournament) => {
        this.dialogRef.close(savedTournament);
      });
  }

  private buildForm(tournament: ITournament): FormGroup {
    return new FormGroup({
      id: new FormControl<number>(tournament?.id || null),
      name: new FormControl<string>(tournament?.name || null, Validators.required),
    });
  }
}
