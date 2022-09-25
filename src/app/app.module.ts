import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Componentes
import { AppComponent } from './app.component';

// Componentes - Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Componentes - Pages
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ContactComponent } from './pages/components/contact/contact.component';
import { AboutUsComponent } from './pages/components/about-us/about-us.component';
import { CardUsComponent } from './pages/components/card-us/card-us.component';

// Componentes - Shared
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// Componentes - Admin
import { NavComponent } from './admin/nav/nav.component';
import { ScheduleFormComponent } from './admin/schedule-form/schedule-form.component';
import { StudentsListComponent } from './admin/students-list/students-list.component';
import { StudentEditComponent } from './admin/student-edit/student-edit.component';
import { StudentFormComponent } from './admin/student-form/student-form.component';
import { ScheduleListComponent } from './admin/schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './admin/schedule-edit/schedule-edit.component';
import { FormListComponent } from './admin/form-list/form-list.component';
import { FormEditComponent } from './admin/form-edit/form-edit.component';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './app-routing.module';

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
    CardUsComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
