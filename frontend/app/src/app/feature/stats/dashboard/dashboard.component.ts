import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { map, Observable, shareReplay } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';
import { StatsService } from 'shared/stats/stats.service';
import { IChartData, IUserStatsPlayedVsWon } from 'shared/stats/stats';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './dashboard.component.html',
})
export class StatsDashboardScreenComponent implements OnInit {
  public userStatsMatchesWon$: Observable<IChartData>;
  public userStatsEventsWon$: Observable<IChartData>;

  private user$: Observable<IUser>;

  constructor(
    private userService: UserService,
    private statsService: StatsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.user$ = this.userService.getUser().pipe(shareReplay(1));

    this.userStatsMatchesWon$ = this.user$.pipe(
      switchMap((user) => this.statsService.getUserStatsMatchesWon(user)),
      map((matchesWonData: IUserStatsPlayedVsWon) => ({
        title: this.translateService.instant('general.stats.matches_won'),
        labels: [
          this.translateService.instant('general.stats.played'),
          this.translateService.instant('general.stats.lost'),
          this.translateService.instant('general.stats.won'),
        ],
        values: [matchesWonData.played, matchesWonData.lost, matchesWonData.won],
      }))
    );

    this.userStatsEventsWon$ = this.user$.pipe(
      switchMap((user) => this.statsService.getUserStatsEventsWon(user)),
      map((eventsWonData: IUserStatsPlayedVsWon) => ({
        title: this.translateService.instant('general.stats.events_won'),
        labels: [
          this.translateService.instant('general.stats.played'),
          this.translateService.instant('general.stats.lost'),
          this.translateService.instant('general.stats.won'),
        ],
        values: [eventsWonData.played, eventsWonData.lost, eventsWonData.won],
      }))
    );
  }
}
