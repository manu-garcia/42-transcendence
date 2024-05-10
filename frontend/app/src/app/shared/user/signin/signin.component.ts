import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { MessageService } from 'primeng/api';

import { UserService } from 'shared/user/user.service';
import { LoggedInUser } from 'shared/user/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public loading;
  public submitted;

  private saveSubscription$: Subscription;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private translateService: TranslateService
  ) {
    this.loading = false;
    this.submitted = false;
  }

  public ngOnInit() {
    this.form = this.buildForm();
  }

  public ngOnDestroy() {
    if (this.saveSubscription$) {
      this.saveSubscription$.unsubscribe();
      this.saveSubscription$ = null;
    }
  }

  public signin() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.saveSubscription$ = this.userService.signin(this.form.value).subscribe(
      (user: LoggedInUser) => {
        this.userService.setLoggedInUser(user);
        this.router.navigateByUrl('/signedin');
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          key: 'errorHandler',
          severity: 'error',
          summary: this.translateService.instant('general.error'),
          detail: this.translateService.instant('shared.user.signin.error_singin'),
        });
      }
    );
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }
}
