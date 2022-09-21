import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormComponent } from './pages/form/form.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './admin/nav/nav.component';
import { ScheduleFormComponent } from './admin/schedule-form/schedule-form.component';
import { StudentsListComponent } from './admin/students-list/students-list.component';
import { StudentEditComponent } from './admin/student-edit/student-edit.component';
import { StudentFormComponent } from './admin/student-form/student-form.component';
import { ScheduleListComponent } from './admin/schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './admin/schedule-edit/schedule-edit.component';
import { FormListComponent } from './admin/form-list/form-list.component';
import { FormEditComponent } from './admin/form-edit/form-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    HomeComponent,
    ContactComponent,
    FormComponent,
    AboutUsComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ScheduleFormComponent,
    StudentsListComponent,
    StudentEditComponent,
    StudentFormComponent,
    ScheduleListComponent,
    ScheduleEditComponent,
    FormListComponent,
    FormEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
