import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { MessageService } from 'primeng/api';

import { UserService } from 'shared/user/user.service';
import { LoggedInUser } from 'shared/user/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit, OnDestroy {
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

  public signup() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.saveSubscription$ = this.userService.signup(this.form.value).subscribe(
      (user: LoggedInUser) => {
        this.userService.setLoggedInUser(user);
        this.router.navigateByUrl('/signin');
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
      password2: new FormControl<string>('', [Validators.required, this.passwordMatchValidator()]),
    });
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordValue = this.form?.get('password')?.value;
      const password2Value = control.value;

      if (!passwordValue || !password2Value) {
        return null;
      }

      const passwordValid = passwordValue === password2Value;

      return !passwordValid ? { passwordMatch: true } : null;
    };
  }
}
