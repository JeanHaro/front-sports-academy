import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Componente
import { NopagefoundComponent } from "./components/nopagefound.component";

const routes: Routes = [
    {
        path: '',
        component: NopagefoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoPageFoundRoutingModule { }