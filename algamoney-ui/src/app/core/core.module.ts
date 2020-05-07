import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import LocalePt from '@angular/common/locales/pt';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { JwtHelperService } from '@auth0/angular-jwt';

import { MoneyHttp } from './../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatorioService } from './../relatorios/relatorio.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

registerLocaleData(LocalePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    DashboardService,
    RelatorioService,
    ErrorHandlerService,
    AuthService,
    MoneyHttp,

    MessageService,
    ConfirmationService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class CoreModule { }
