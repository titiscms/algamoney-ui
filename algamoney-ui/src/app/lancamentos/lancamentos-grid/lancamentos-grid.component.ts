import { Component, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() totalRegistros: LancamentosPesquisaComponent;
  @Input() filtro: LancamentoFiltro;

  constructor(
    private lancamentoPesquisa: LancamentosPesquisaComponent
  ) {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows
    this.lancamentoPesquisa.pesquisar(pagina);
  }
}
