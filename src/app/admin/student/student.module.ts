import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentsUniqueComponent } from './students-unique/students-unique.component';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Routing
import { StudentRoutingModule } from './student.routing';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentFormComponent,
    StudentEditComponent,
    StudentsUniqueComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
