import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { SharedModule } from './../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CurrencyMaskModule,

    ButtonModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    SelectButtonModule,
    TooltipModule,
    FileUploadModule,

    SharedModule,
    LancamentosRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent,
    LancamentosGridComponent
  ],
  exports: []
})
export class LancamentosModule { }
