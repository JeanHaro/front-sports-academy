import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTPs
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';

// Routing
import { AuthRoutingModule } from './auth.routing';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ModalLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
})
export class AuthModule { }
