import { AuthService } from 'app/seguranca/auth.service';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: AuthHttp,
    private authService: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
      });
  }
}
