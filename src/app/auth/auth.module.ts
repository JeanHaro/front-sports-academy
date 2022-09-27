import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Routing
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
