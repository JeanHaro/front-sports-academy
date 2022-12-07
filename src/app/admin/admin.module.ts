import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { AdminRoutingModule } from './admin.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
