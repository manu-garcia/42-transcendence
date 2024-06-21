import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IEvent, IEventMatch } from './event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = '/api/events/';

  constructor(private http: HttpClient) {}

  public getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiUrl);
  }

  public getMatches(event: IEvent): Observable<IEventMatch[]> {
    return this.http.get<IEventMatch[]>(`${this.apiUrl}${event.id}/matches/`);
  }

  public saveEvent(event: IEvent): Observable<IEvent> {
    if (!event?.id) {
      return this.http.post<IEvent>(this.apiUrl, event);
    }

    return this.http.put<IEvent>(`${this.apiUrl}${event.id}/`, event);
  }
}
