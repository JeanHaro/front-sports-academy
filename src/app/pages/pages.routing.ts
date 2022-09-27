import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes 
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    // Path inicial
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'form', component: FormComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}