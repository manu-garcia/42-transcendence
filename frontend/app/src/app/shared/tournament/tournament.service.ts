import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ITournament } from './tournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private apiUrl = '/api/tournaments';

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(this.apiUrl);
  }
}
