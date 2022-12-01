import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes
import { NotifyComponent } from "./components/notify.component";

const routes: Routes = [
    {
        path: '',
        component: NotifyComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NotifyRoutingModule {}