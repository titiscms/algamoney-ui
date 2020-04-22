import { Component, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';

import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { PessoasPesquisaComponent } from './../pessoas-pesquisa/pessoas-pesquisa.component';
import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() totalRegistros: PessoasPesquisaComponent
  @Input() filtro: PessoaFiltro;
  @ViewChild('tabela') grid;

  constructor(
    private pessoaPesquisa: PessoasPesquisaComponent,
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
  ) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pessoaPesquisa.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a pessoa ${pessoa.nome}?`,
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pessoaPesquisa.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toastyService.success(`Pessoa ${pessoa.nome} excluído com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.alterarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toastyService.success(`Pessoa ${pessoa.nome} ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
