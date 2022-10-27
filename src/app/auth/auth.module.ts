import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formulario
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Routing
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
