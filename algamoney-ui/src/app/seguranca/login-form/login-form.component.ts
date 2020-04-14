import { Component, OnInit } from '@angular/core';

import { OauthService } from './../oauth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private oauth: OauthService) { }

  ngOnInit() {
  }

  login(usuario: string, senha: string) {
    this.oauth.login(usuario, senha);
  }
}
