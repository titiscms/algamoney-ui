import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OauthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(
    private http: Http,
  ) { }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });
  }
}
