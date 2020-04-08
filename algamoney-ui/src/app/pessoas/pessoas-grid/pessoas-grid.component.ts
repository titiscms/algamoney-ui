import { LazyLoadEvent } from 'primeng/components/common/api';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, Input } from '@angular/core';

import { PessoasPesquisaComponent } from './../pessoas-pesquisa/pessoas-pesquisa.component';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() totalRegistros: PessoasPesquisaComponent
  @Input() filtro: PessoaFiltro;

  constructor(private pessoaPesquisa: PessoasPesquisaComponent ) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pessoaPesquisa.pesquisar(pagina);
  }
}
