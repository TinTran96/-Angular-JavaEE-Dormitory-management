import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateStudentComponent } from './create-student.component';

@NgModule({
    imports: [FormsModule,ReactiveFormsModule],
    declarations: [CreateStudentComponent],
    exports: [CreateStudentComponent]
})

export class CreateStudentModule { }
