import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { ProfileComponent } from './profile/profile.component';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Routing
import { SettingsRoutingModule } from './settings.routing';
import { SecurityComponent } from './security/security.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
