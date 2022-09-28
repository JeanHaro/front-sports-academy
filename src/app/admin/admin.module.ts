import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { AdminRoutingModule } from './admin.routing';

// Componentes
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
