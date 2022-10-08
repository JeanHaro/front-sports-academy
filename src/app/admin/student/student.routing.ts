import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// Componentes
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentFormComponent } from "./student-form/student-form.component";
import { StudentEditComponent } from "./student-edit/student-edit.component";
import { StudentsUniqueComponent } from "./students-unique/students-unique.component";

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
    },
    {
        path: ':id',
        component: StudentsUniqueComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentRoutingModule {}