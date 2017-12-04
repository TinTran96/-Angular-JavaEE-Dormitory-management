import { Route } from '@angular/router';

import { CreateRoomComponent } from './index';

export const CreateRoomRoutes: Route[] = [
  {
    path: 'room-list/create',
    component: CreateRoomComponent
  },{
    path: 'room-list/create/:id',
    component: CreateRoomComponent
  },
];
