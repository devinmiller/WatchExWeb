import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    console.log(this.authService.isLoggedIn());

    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.startLogin();
    return false;
  }


}
