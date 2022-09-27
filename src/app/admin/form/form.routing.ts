import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes
import { FormListComponent } from "./form-list/form-list.component";
import { FormEditComponent } from "./form-edit/form-edit.component";

const routes: Routes = [
    {
        path: '',
        component: FormListComponent,
    },
    {
        path: 'edit/:id',
        component: FormEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FormRoutingModule {}