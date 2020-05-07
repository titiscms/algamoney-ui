import { Component, OnInit } from '@angular/core';
import { FormControl  } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { Pessoa } from 'app/core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private titulo: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.titulo.setTitle('Nova Pessoa');
    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => {
        this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado =
          (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    return this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa cadastrada com sucesso!'
        });

        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    return this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa alterada com sucesso!'
        });
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

    novo(form: FormControl) {
      form.reset();

      setTimeout(() => {
        this.pessoa = new Pessoa();
      }, 1);

      this.router.navigate(['/pessoas/nova']);
    }

  atualizarTitulo() {
    this.titulo.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}
