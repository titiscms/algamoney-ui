import { Component, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';

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
    private lancamentoService: LancamentoService
  ) {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows
    this.lancamentoPesquisa.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.lancamentoPesquisa.pesquisar();
        } else {
          this.grid.first = 0;
        }
      });
  }
}
