import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEventMatch } from 'shared/event/event';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = '/api/events/';

  constructor(private http: HttpClient) {}

  public getMatch(): Observable<IEventMatch[]> {
    return this.http.get<IEventMatch[]>(this.apiUrl);
  }

  public saveMatch(match: IEventMatch): Observable<IEventMatch> {
    if (!match?.id) {
      return this.http.post<IEventMatch>(this.apiUrl, match);
    }

    return this.http.put<IEventMatch>(`${this.apiUrl}`, match);
  }
}
