import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { NotAuthenticationError } from './../seguranca/money-http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticationError) {
      msg = 'Sua sessão expirou!'
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {

      msg = 'Ocorreu um erro ao processar a sua solicitação.';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para realizar esta ação!'
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente mais tarde.';
      console.error('Ocorreu um erro.', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg });
  }
}
