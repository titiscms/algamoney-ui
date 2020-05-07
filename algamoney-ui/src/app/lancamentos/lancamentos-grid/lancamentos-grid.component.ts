import { Component, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() totalRegistros: LancamentosPesquisaComponent;
  @Input() filtro: LancamentoFiltro;
  @ViewChild('tabela', {static: true}) grid;

  constructor(
    private lancamentoPesquisa: LancamentosPesquisaComponent,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
  ) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows
    this.lancamentoPesquisa.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o lançamento ${lancamento.descricao}?`,
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.lancamentoPesquisa.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({
          severity: 'success',
          detail: `Lançamento ${lancamento.descricao} excluído com sucesso`
        })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
