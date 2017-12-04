import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import {RoomListRoutes} from './room-list/room-list.routes';
import { CreateRoomRoutes } from './create-room/create-room.routes';
import { CreateAbsencesRoutes } from './create-absences/create-absences.routes';
import { StudentListRoutes } from './student-list/student-list.routes';
import { CreateStudentRoutes } from './create-student/create-student.routes';
import { AbsencesRoutes} from './absences/absences.routes';
import { DashboardComponent } from './index';
import { AuthguardGuard } from 'app/guard/authguard.guard';

export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      canActivate: [AuthguardGuard],
      component: DashboardComponent,
      children: [
        ...HomeRoutes,
        ...RoomListRoutes,
        ...CreateRoomRoutes,
        ...StudentListRoutes,
        ...CreateStudentRoutes,
        ...AbsencesRoutes,
        ...CreateAbsencesRoutes,
      ]
    }
];
