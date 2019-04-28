import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
   }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  startLogin(): Promise<void> {
    return this.manager.signinRedirect();
  }

  async finishLogin(): Promise<void> {
    const user = await this.manager.signinRedirectCallback();
    this.user = user;
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.authentication.authority,
    client_id: 'wex',
    redirect_uri: environment.authentication.redirectUri,
    post_logout_redirect_uri: environment.authentication.logoutUri,
    response_type: "code",
    scope: "openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true,
    response_mode: 'query'
  };
}
