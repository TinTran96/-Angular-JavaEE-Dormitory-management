import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ModalModule, ModalDirective } from 'ngx-bootstrap';
import { SelectModule } from 'ng2-select';

//Service
import { StudentService } from './service/student.service';
import { RoomService } from './service/room.service';
import { FloorService } from './service/floor.service';
import { BuildingService } from './service/building.service';
import { ClubService } from './service/club.service';
import { ClassService } from './service/class.service';
import { FacultyService } from './service/faculty.service';
import { AuthguardGuard } from 'app/guard/authguard.guard';
import { UserService } from 'app/service/user.service';
import { AbsencesService } from 'app/service/absences.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    LoginModule,
    SignupModule,
    DashboardModule,
    SelectModule,
    ModalModule.forRoot(),
  ],
  providers: [
    StudentService,
    RoomService,
    ClubService,
    ClassService,
    FacultyService,
    AuthguardGuard,
    UserService,
    AbsencesService,
    FloorService,
    BuildingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
