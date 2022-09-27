import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentFormComponent } from "./student-form/student-form.component";
import { StudentEditComponent } from "./student-edit/student-edit.component";

const routes: Routes = [
    {
        path: '',
        component: StudentsListComponent
    },
    {
        path: 'create',
        component: StudentFormComponent
    },
    {
        path: 'edit/:id',
        component: StudentEditComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentRoutingModule {}