import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTPs
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { ScheduleListComponent } from "./schedule-list/schedule-list.component";
import { ScheduleFormComponent } from "./schedule-form/schedule-form.component";
import { ScheduleEditComponent } from "./schedule-edit/schedule-edit.component";
import { ScheduleUniqueComponent } from './schedule-unique/schedule-unique.component';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

// Routing
import { ScheduleRoutingModule } from './schedule.routing';

@NgModule({
  declarations: [
    ScheduleListComponent,
    ScheduleFormComponent,
    ScheduleEditComponent,
    ScheduleUniqueComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ScheduleRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ScheduleModule { }
