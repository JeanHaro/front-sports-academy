import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes 
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CardUsComponent } from './components/card-us/card-us.component';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

// Routing
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    FormComponent,
    ContactComponent,
    AboutUsComponent,
    CardUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    PagesComponent,
    HomeComponent,
    FormComponent,
    ContactComponent,
    AboutUsComponent,
    CardUsComponent
  ]
})
export class PagesModule { }
