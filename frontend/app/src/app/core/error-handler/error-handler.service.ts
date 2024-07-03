import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { UserService } from 'shared/user/user.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private messageService: MessageService,
    private ngZone: NgZone,
    private userService: UserService,
    private router: Router
  ) {}

  public handleError(error: any) {
    this.ngZone.run(() => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          // Forbidden 403
          case 403:
            this.userService.storedLoggedInUser = null;
            this.router.navigateByUrl('/');
            break;
          case 500:
            if (!environment || environment.production) {
              return;
            }
            break;
          default:
            break;
        }

        this.showError(`ErrorHandlerService: HttpErrorResponse error with status: ${error.status}`);
      } else {
        this.showError(`ErrorHandlerService: error caught: ${error}`);
      }
    });
  }

  private showError(messageError: string) {
    console.log(messageError);
    this.messageService.add({ key: 'errorHandler', severity: 'error', summary: 'Error', detail: messageError });
  }
}
