import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes
import { FormComponent } from "./components/form.component";

const routes: Routes = [
    {
        path: '',
        component: FormComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FormRoutingModule {}