import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormListComponent } from './form-list/form-list.component';

// Routing
import { FormRoutingModule } from './form.routing';

@NgModule({
  declarations: [
    FormEditComponent,
    FormListComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule
  ]
})
export class FormModule { }
