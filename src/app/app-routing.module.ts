import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes - Pages
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

// Componentes - Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Componentes - Admin
import { NavComponent } from './admin/nav/nav.component';
import { ScheduleListComponent } from './admin/schedule-list/schedule-list.component';
import { ScheduleFormComponent } from './admin/schedule-form/schedule-form.component';
import { ScheduleEditComponent } from './admin/schedule-edit/schedule-edit.component';
import { FormListComponent } from './admin/form-list/form-list.component';
import { FormEditComponent } from './admin/form-edit/form-edit.component';
import { StudentsListComponent } from './admin/students-list/students-list.component';
import { StudentFormComponent } from './admin/student-form/student-form.component';
import { StudentEditComponent } from './admin/student-edit/student-edit.component';

const routes: Routes = [
  // Pages
  { path: 'home', component: HomeComponent },
  { path: 'home/form', component: FormComponent },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin
  { path: 'admin', component: NavComponent },
  // Admin - Horario
  { path: 'admin/schedule', component: ScheduleListComponent },
  { path: 'admin/schedule/create', component: ScheduleFormComponent },
  { path: 'admin/schedule/edit/:id', component: ScheduleEditComponent },
  // Admin - Matricula
  { path: 'admin/form', component: FormListComponent },
  { path: 'admin/form/edit/:id', component: FormEditComponent },
  // Admin - Registro
  { path: 'admin/student', component: StudentsListComponent },
  { path: 'admin/student/create', component: StudentFormComponent },
  { path: 'admin/student/edit/:id', component: StudentEditComponent },

  // Inicial
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // 404 - Not found
  { path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
