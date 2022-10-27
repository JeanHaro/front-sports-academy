import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTPs
import { HttpClientModule } from '@angular/common/http';

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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
