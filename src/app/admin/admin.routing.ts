import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

// Componentes
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
    // Path inicial
    {
        path: '',
        component: LayoutComponent,
        children: [
            { 
                path: 'schedule', 
                loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
            },
            { 
                path: 'forms', 
                loadChildren: () => import('./form/form.module').then(m => m.FormModule)
            },
            { 
                path: 'students', 
                loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}