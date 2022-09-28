import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { FormComponent } from './components/form.component';

// Routing
import { FormRoutingModule } from './form.routing';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule
  ]
})
export class FormModule { }
