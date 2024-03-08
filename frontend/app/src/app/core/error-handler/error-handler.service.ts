import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private messageService: MessageService, private ngZone: NgZone) {}

  public handleError(error: any) {
    this.ngZone.run(() => {
      if (error instanceof HttpErrorResponse) {
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
