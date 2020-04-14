import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <h1 class="text-center">Página não encontrada</h1>
    </div>
  `,
  styles: [`
    .text-center {
      text-align: center;
    }`
  ]
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
