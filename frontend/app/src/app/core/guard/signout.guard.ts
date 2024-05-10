import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from 'shared/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SignoutGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    // Not authenticated, let user access sigin screen
    if (!this.userService.isAuthenticated()) {
      return true;
    }

    this.router.navigateByUrl('/home');
    return false;
  }
}
