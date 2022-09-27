import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

// Routing
import { StudentRoutingModule } from './student.routing';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentFormComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
