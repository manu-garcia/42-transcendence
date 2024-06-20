import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEventMatch, IEvent } from 'shared/event/event';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = '/api/events/';

  constructor(private http: HttpClient) {}

  public getMatch(event: IEvent): Observable<IEventMatch> {
    return this.http.get<IEventMatch>(`${this.apiUrl}${event.id}/next_match/`);
  }

  public saveMatch(match: IEventMatch): Observable<IEventMatch> {
    return this.http.post<IEventMatch>(`${this.apiUrl}${match.event.id}/match/`, match);
  }
}
