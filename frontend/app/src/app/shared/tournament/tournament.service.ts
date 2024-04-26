import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ITournament } from './tournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private apiUrl = '/api/tournaments/';

  constructor(private http: HttpClient) {}

  public getTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(this.apiUrl);
  }

  public saveTournament(tournment: ITournament): Observable<ITournament> {
    if (!tournment?.id) {
      return this.http.post<ITournament>(this.apiUrl, tournment);
    }

    return this.http.put<ITournament>(`${this.apiUrl}${tournment.id}/`, tournment);
  }
}
