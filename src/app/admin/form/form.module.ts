import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { FormListComponent } from './form-list/form-list.component';

// Routing
import { FormRoutingModule } from './form.routing';

@NgModule({
  declarations: [
    FormListComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule
  ]
})
export class FormModule { }
