import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.finishLogin();

    if(this.authService.isLoggedIn())
    {
      if(window.localStorage) {
        let redirectUrl = JSON.parse(window.localStorage.getItem('wexAuthRedirect'));

        this.router.navigateByUrl(redirectUrl || '/');
      }
    }
  }

}
