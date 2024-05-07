import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RouterService } from 'shared/router/router.service';
import { LoggedInUser } from 'shared/user/user';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(private routerService: RouterService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/api/')) {
      const user: LoggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

      // Only include the Authorization header if the user token is available
      const headers = user?.token ? { Authorization: `Token ${user.token}` } : {};

      const apiReq = req.clone({ url: this.routerService.getApiUrl(req.url), setHeaders: headers });
      return next.handle(apiReq);
    }

    return next.handle(req);
  }
}
