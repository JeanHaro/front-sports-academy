import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

// Componentes
import { LayoutComponent } from "./layout/layout.component";

// Guardian
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    // Path inicial
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
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
            {
                path: 'notify',
                loadChildren: () => import('./notify/notify.module').then(m => m.NotifyModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}