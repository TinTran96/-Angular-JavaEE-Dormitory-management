import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'ng2-select';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ModalModule} from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import { RoomListComponent } from './room-list/room-list.component';
import {CreateRoomComponent} from './create-room/create-room.component';
import { StudentListComponent } from './student-list/student-list.component';
import {CreateStudentComponent} from './create-student/create-student.component';
import {AbsencesComponent} from './absences/absences.component';
import {CreateAbsencesComponent} from './create-absences/create-absences.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule,
      ModalModule.forRoot(),
      Ng2BootstrapModule.forRoot(),
      HomeModule,
      SelectModule,
      BsDatepickerModule.forRoot()
    ],
    declarations: [DashboardComponent,
                   TopNavComponent,
                   SidebarComponent,
                   RoomListComponent,
                   StudentListComponent,
                   CreateStudentComponent,
                   CreateRoomComponent,
                   AbsencesComponent,
                   CreateAbsencesComponent
                  ],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
