import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

// Quicklink
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink'

// Componentes
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
    // Path inicial
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            { 
                path: 'schedule', 
                loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
            },
            { 
                path: 'form', 
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
    imports: [
        QuicklinkModule,
        RouterModule.forRoot(routes, {
            preloadingStrategy: QuicklinkStrategy
        }),
    ],
    exports: [RouterModule]
})

export class AdminRoutingModule {}