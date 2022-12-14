import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes
import { ScheduleListComponent } from "./schedule-list/schedule-list.component";
import { ScheduleFormComponent } from "./schedule-form/schedule-form.component";
import { ScheduleEditComponent } from "./schedule-edit/schedule-edit.component";
import { ScheduleUniqueComponent } from "./schedule-unique/schedule-unique.component";

const routes: Routes = [
    {
        path: '',
        component: ScheduleListComponent
    },
    {
        path: 'create',
        component: ScheduleFormComponent
    },
    {
        path: 'edit/:id',
        component: ScheduleEditComponent
    },
    {
        path: ':id',
        component: ScheduleUniqueComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ScheduleRoutingModule {}