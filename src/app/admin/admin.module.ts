import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { LayoutComponent } from './layout/layout.component';

// Modulos
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class AdminModule { }
