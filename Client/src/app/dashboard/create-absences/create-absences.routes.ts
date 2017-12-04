import { Route } from '@angular/router';

import { CreateAbsencesComponent } from './index';

export const CreateAbsencesRoutes: Route[] = [
  {
    path: 'absences/create',
    component: CreateAbsencesComponent
  },
  {
    path: 'absences/create/:id',
    component: CreateAbsencesComponent
  },
  {
    path: 'absences/view/:id',
    component: CreateAbsencesComponent
  }
  
];
