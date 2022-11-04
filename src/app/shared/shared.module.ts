import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Pipes
import { FormDatePipe } from './pipes/form-date.pipe';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormDatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormDatePipe
  ]
})
export class SharedModule { }
