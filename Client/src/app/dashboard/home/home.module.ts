import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
