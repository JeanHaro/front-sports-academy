import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    // Path inicial
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}