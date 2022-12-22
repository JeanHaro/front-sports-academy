import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes
import { ProfileComponent } from "./profile/profile.component";
import { SecurityComponent } from "./security/security.component";

// Rutas
const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'security',
        component: SecurityComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SettingsRoutingModule {}