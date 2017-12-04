import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RoomService} from '../../service/room.service';
import {StudentService} from '../../service/student.service';
import {AbsencesService} from '../../service/absences.service';
/**
*  This class represents the lazy loaded HomeComponent.
*/

@Component({
    selector: 'app-home-cmp',
    templateUrl: './home.component.html'
})

export class HomeComponent {
  private student_count:any;
  private absences_count:any;
  private room_count:any;
  constructor(private roomServ:RoomService,
    private studentServ:StudentService,
    private absencesServ:AbsencesService,
    private router: Router,
    private route: ActivatedRoute){

  }
  ngOnInit() {
    this.fetchAbsences();
    this.fetchStudent();
    this.fetchRoom();
  }
  fetchAbsences()
  {
    this.absencesServ.getAllAbsences()
    .subscribe(data =>{
      console.log(data);
      this.absences_count = data.length;
    },errorCode =>console.log(errorCode));
  }
  fetchStudent()
  {
    this.studentServ.getAllStudent()
    .subscribe(data =>{
      console.log(data);
      this.student_count = data.length;
    },errorCode =>console.log(errorCode));
  }
  fetchRoom()
  {
    this.roomServ.getAllRoom()
    .subscribe(data =>{
      console.log(data);
      this.room_count = data.length;
    },errorCode =>console.log(errorCode));
  }
  goTo(choice)
  {
    switch(choice)
    {
      case 0:
        this.router.navigateByUrl('/dashboard/room-list');
        break;
      case 1:
        this.router.navigateByUrl('/dashboard/student-list');
        break;
      case 2:
        this.router.navigateByUrl('/dashboard/absences');
        break;
    }
    
  }
}
