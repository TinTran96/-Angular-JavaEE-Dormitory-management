import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAbsencesComponent } from './create-absences.component';

@NgModule({
    imports: [FormsModule,ReactiveFormsModule],
    declarations: [CreateAbsencesComponent],
    exports: [CreateAbsencesComponent]
})

export class CreateAbsencesModule { }
