import { Component, ViewChild } from '@angular/core';
import { ModalModule,ModalDirective} from 'ngx-bootstrap';
import {RoomService} from '../../service/room.service';
import {StudentService} from '../../service/student.service';
import { Student } from '../../modal/student';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.css']
})

export class RoomListComponent {
    @ViewChild('RoomInforModal') private roomInforModal : ModalDirective;
    @ViewChild('ChangeRoomModal') private changeRoomModal : ModalDirective;
    private rooms:any = [];
    private room_infor:any;
    private students:any=[];
    private students_tmp:any;
    private students_display:any;
    private students_change:any=[];
    private data: any = [];
    private full_flag=false;
    private currentPage: number = 1;
    private totalItems: number;
    private itemsPerPage: number = 5;
    private maxSize: number = 10;
    constructor(
        private roomServ:RoomService,
        private studentServ:StudentService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.room_infor={
            "id":"",
            "student_Lst":[],
            "size":0,
        };
        this.fetchRooms();
        this.fetchStudent();
    }

    /*
    *Load Room data
    */
    public fetchRooms()
    {
        this.roomServ.getAllRoom()
        .subscribe(
                  data => {
                    this.rooms = data;
                    console.log("room",this.rooms);
                    
                  },errorCode =>  console.log(errorCode));
    }


    /**
     * Paginate function
     * @param event 
     */
    public pageChanged(event: any): void {
        let start = (event.page - 1) * event.itemsPerPage;
        let end = event.itemsPerPage > -1 ? (start + event.itemsPerPage) : this.students_tmp.length;
        this.data = this.students_tmp.slice(start, end);
    }

    public showModal(object)
    {
        this.students_display=[];
        this.room_infor = object;
        var count = 0;
        for(var i=0;i<this.students.length;i++)
        {
            if(this.students[i].roomId===this.room_infor.id)
            {
                this.students_display.push(this.students[i]);
                count++;
            }
        }
        this.room_infor.size = count;
        this.roomInforModal.show();
    }

    public fetchStudent()
    {
        this.studentServ.getAllStudent()
        .subscribe(
            student_data => {
                this.students = student_data;
                console.log("students",this.students);
            },errorCode =>  console.log(errorCode));
    }

    public showStudentModal()
    {
        this.students_tmp = this.students;
        var x = 0;
        var ok = false;
        while(x<this.students_tmp.length)
        {
            for(var i = 0;i<this.room_infor.size;i++)
            {
                if(this.room_infor.id === this.students_tmp[x].roomId)
                {
                    this.students_tmp[x].checked = true;
                    ok = true;
                }
            }
            if(ok == false)
            {
                this.students_tmp[x].checked = false;
            }
            x++;
        }
        this.totalItems = this.students_tmp.length;
        this.pageChanged({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
        this.changeRoomModal.show();
    }

    public changeStudent(studentObj)
    {
        console.log("Change student");
        if(studentObj.checked == true)
        {
            studentObj.checked = false;
        }
        else
        {
            studentObj.checked = true;
        }
        var count = 0;
        for(var i = 0;i<this.students_tmp.length;i++)
        {
            if(this.students_tmp[i].checked == true)
            {
                count++;
            }
        }
        console.log("Capacity",this.room_infor.capacity);
        console.log("Count",count);
        if(count > this.room_infor.capacity)
        {
            this.full_flag = true;
        }
        else
        {
            this.full_flag = false;
        }
        console.log("Flag",this.full_flag);
        console.log("TMP LST",this.students_tmp);
    }
    public submitChange()
    {
        var check_flg = 0;
        for(var i = 0;i<this.students_tmp.length;i++)
        {
            check_flg = 0;
            for(var y =0;y<this.students_display.length;y++)
            {
                if(this.students_tmp[i].id === this.students_display[y].id)
                {
                    this.students_change.push(this.students_tmp[i]);
                    check_flg++;
                    break;
                }
            }
            if(this.students_tmp[i].checked===true && check_flg == 0)
            {
                this.students_change.push(this.students_tmp[i]);
            }
        }
        console.log("Student Change",this.students_change);
        for(var z = 0; z<this.students_change.length;z++)
        {
            var me = this;
            var student=this.students_change[z];
            if(student.checked === false)
            {
                student.roomId = null;
            }
            else
            {
                student.roomId = this.room_infor.id;
            }
            var date_set = new Date(student.dob);
            let student_obj= new Student(
                student.id,
                student.clubId,
                student.classId,
                student.roomId,
                student.name,
                student.gender,
                date_set,
                student.ssn,
                student.address,
                student.phone,
                student.pob,
                student.nation,
                student.religion,
                student.course);
            this.studentServ.updateStudent(student_obj)
            .subscribe(successCode =>{
                console.log(successCode);
                if(z == this.students_change.length)
                {
                    this.changeRoomModal.hide();
                    this.roomInforModal.hide();
                    this.fetchRooms();
                    this.fetchStudent();
                    swal(
                        'Success',
                        'Update room success!',
                        'success'
                      )
                }
                },errorCode =>console.log(errorCode));
        }
    }

    public onOut(object)
    {
        var date_set = new Date(object.dob);
        console.log("object",object);
        var student = object;
        let student_obj= new Student(
            student.id,
            student.clubId,
            student.classId,
            null,
            student.name,
            student.gender,
            student.date_set,
            student.ssn,
            student.address,
            student.phone,
            student.pob,
            student.nation,
            student.religion,
            student.course);
            this.studentServ.updateStudent(student_obj)
            .subscribe(successCode =>{
                console.log(successCode);
                    this.roomInforModal.hide();
                    this.fetchRooms();
                    this.fetchStudent();
                },errorCode =>console.log(errorCode));
    }
    public deleteRoom(roomId)
    {
      var me = this;
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        var count = 0;
        for(var i=0;i<me.students.length;i++)
        {
            if(me.students[i].roomId === roomId)
            {
                me.students_display.push(me.students[i]);
                count++;
            }
        }
        if(count > 0)
        {
            swal(
                'Error',
                'There are still students in the room!',
                'error'
              )
            return;
        }
        console.log("Delete room ID ",roomId);
        me.roomServ.deleteRoomById(roomId)
        .subscribe(
                  data => {
                    me.fetchRooms();
                  },errorCode =>  console.log(errorCode));
      })
      
    }
}
