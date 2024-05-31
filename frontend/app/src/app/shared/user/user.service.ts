import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, tap, map } from 'rxjs';

import moment from 'moment';

import { IUser, IUserCredentials, LoggedInUser } from './user';

const LOCAL_STORAGE_USER_KEY = 'user';

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

    return this.http.get<IUser>(`${this.apiUrl}${this.storedLoggedInUser.id}/`);
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  // TODO: Intentar unificar saveUserFormData y saveUser
  public saveUserFormData(userId: number, userFormData: FormData): Observable<IUser> {
    return this.http.patch<IUser>(`${this.apiUrl}${userId}/`, userFormData);
  }

  public saveUser(user: IUser): Observable<IUser> {
    return this.http.patch<IUser>(`${this.apiUrl}${user.id}/`, { ...user });
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
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
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
    const loggedInUser: LoggedInUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY) || '{}');
    if (!loggedInUser) {
      return null;
    }
    return loggedInUser;
  }

  public set storedLoggedInUser(user: LoggedInUser) {
    if (user === null) {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    } else if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) !== JSON.stringify(user)) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    }
  }

  public isOnline(user: IUser): boolean {
    if (!user || !user.lastActivity) {
      return false;
    }

    const lastActivity = moment(user.lastActivity);
    const now = moment();

    // Calculate the difference in minutes between now and lastActivity
    const minutesDiff = now.diff(lastActivity, 'minutes');

    // If the difference is greater than 2 minutes, consider user as offline
    if (minutesDiff > 2) {
      return false;
    } else {
      return true;
    }
  }
}
