import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
