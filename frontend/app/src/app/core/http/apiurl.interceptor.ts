import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { RouterService } from 'shared/router/router.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor(
    private routerService: RouterService,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/api/')) {
      const apiReq = req.clone({ url: this.routerService.getApiUrl(req.url)});
      return next.handle(apiReq);
    }

    return next.handle(req);
  }
}
