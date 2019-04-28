import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route);
    console.log(state);

    if (this.authService.isLoggedIn()) {
      return true;
    }

    if(window.localStorage)
    {
      window.localStorage.setItem('wexAuthRedirect', JSON.stringify(state.url));
    }

    this.authService.startLogin();
    return false;
  }
}
