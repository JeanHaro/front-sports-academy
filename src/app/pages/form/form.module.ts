import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { FormComponent } from './components/form.component';

// Routing
import { FormRoutingModule } from './form.routing';

// Modulos
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FormModule { }
