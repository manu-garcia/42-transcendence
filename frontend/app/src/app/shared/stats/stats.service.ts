import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from 'shared/user/user';
import { IUserStatsPlayedVsWon } from './stats';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private apiUrl = '/api/events/';

  constructor(private http: HttpClient) {}

  public getUserStatsMatchesWon(user: IUser): Observable<IUserStatsPlayedVsWon> {
    return this.http.get<IUserStatsPlayedVsWon>(`${this.apiUrl}stats/user/${user.id}/matches-won/`);
  }

  public getUserStatsEventsWon(user: IUser): Observable<IUserStatsPlayedVsWon> {
    return this.http.get<IUserStatsPlayedVsWon>(`${this.apiUrl}stats/user/${user.id}/events-won/`);
  }
}
