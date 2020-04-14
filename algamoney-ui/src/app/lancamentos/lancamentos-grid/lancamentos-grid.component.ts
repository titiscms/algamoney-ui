import { Component, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() totalRegistros: LancamentosPesquisaComponent;
  @Input() filtro: LancamentoFiltro;
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoPesquisa: LancamentosPesquisaComponent,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

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

        this.toastyService.success(`Lançamento ${lancamento.descricao} excluído com sucesso`)
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
