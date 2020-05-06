import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { MoneyHttp } from './../seguranca/money-http';
import { environment } from './../../environments/environment';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.categoriasUrl)
      .toPromise()
      .then(response => response.content);
  }
}
