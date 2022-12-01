import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { NotifyComponent } from './components/notify.component';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Routing
import { NotifyRoutingModule } from './notify.routing';

@NgModule({
  declarations: [
    NotifyComponent
  ],
  imports: [
    CommonModule,
    NotifyRoutingModule,
    FontAwesomeModule
  ]
})
export class NotifyModule { }
