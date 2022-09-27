import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';

// Routing
import { ScheduleRoutingModule } from './schedule.routing';

@NgModule({
  declarations: [
    ScheduleListComponent,
    ScheduleFormComponent,
    ScheduleEditComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
