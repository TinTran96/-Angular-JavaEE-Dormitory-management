import { Route } from '@angular/router';

import { CreateStudentComponent } from './index';

export const CreateStudentRoutes: Route[] = [
  {
    path: 'student-list/create',
    component: CreateStudentComponent
  },
  {
    path: 'student-list/create/:id',
    component: CreateStudentComponent
  },
  
];
