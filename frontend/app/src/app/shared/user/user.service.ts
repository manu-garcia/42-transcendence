import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, tap } from 'rxjs';

import { IUser, IUserCredentials, LoggedInUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users/';

  constructor(private http: HttpClient) {}

  public getUser(): Observable<IUser> {
    if (!this.storedLoggedInUser || !this.storedLoggedInUser.id) {
      this.storedLoggedInUser = null;
      return of(null);
    }

    return this.http.get<IUser>(`${this.apiUrl}${this.storedLoggedInUser.id}`);
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  public signin(userCredentials: IUserCredentials): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`/api/api-user-signin/`, userCredentials);
  }

  public signup(userCredentials: IUserCredentials): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`/api/api-user-signup/`, userCredentials);
  }

  public signout(): Observable<void> {
    return this.http.get<void>(`/api/api-user-signout/`).pipe(
      tap(() => {
        localStorage.removeItem('user');
      })
    );
  }

  public isAuthenticated(): boolean {
    if (!this.storedLoggedInUser || !this.storedLoggedInUser.token || !this.storedLoggedInUser.id) {
      this.storedLoggedInUser = null;
      return false;
    }

    return true;
  }

  public get storedLoggedInUser(): LoggedInUser {
    const loggedInUser: LoggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!loggedInUser) {
      return null;
    }
    return loggedInUser;
  }

  public set storedLoggedInUser(user: LoggedInUser) {
    if (localStorage.getItem('user') !== JSON.stringify(user)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}
