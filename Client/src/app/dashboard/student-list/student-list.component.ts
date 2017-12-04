import { Component, ViewChild } from '@angular/core';
import { ModalModule,ModalDirective} from 'ngx-bootstrap';
import { SelectModule,SelectComponent} from 'ng2-select';
import { StudentService } from '../../service/student.service';
import { FacultyService } from '../../service/faculty.service';
import { ClubService } from '../../service/club.service';
import swal from 'sweetalert2';
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
  }
@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})

export class StudentListComponent {
  @ViewChild('StudentInforModal') private studentInforModal : ModalDirective;
  @ViewChild('SelectFaculty') public selectFaculty: SelectComponent;
    private studentInfor:any;
    private studentList:any;
    private students:any;
    private id_search:string="";
    private name_search:string="";
    private clubs:any=[];
    public tableData1: TableData;
    private data: any = [];
    private currentPage: number = 1;
    private totalItems: number;
    private itemsPerPage: number = 10;
    private maxSize: number = 10;
    private statusCode:any;
    constructor(
      private studentServ:StudentService,
      private facultyServ:FacultyService,
      private clubServ:ClubService
              ) { }
  
    ngOnInit() {
      this.studentInfor={
        "id": "",
        "club_id": "",
        "class_id": "",
        "room_id":"",
        "name": "",
        "gender": 1,
        "dob": "",
        "ssn": "",
        "address": "",
        "phone": "",
        "pob": "",
        "nation": "",
        "religion": "",
        "course": "",
        "faculty_name":"",
        "club_name":"",
      }
      this.fetchClubs();
      this.fetchStudents();
      
    }

    /*
    *Load Student data
    */
    public fetchStudents()
    {
      this.studentServ.getAllStudent()
      .subscribe(
                data => {
                  this.studentList = data;
                  for(var i = 0;i<this.studentList.length;i++)
                  {
                    for(var y =0;y<this.clubs.length;y++)
                    {
                      if(this.studentList[i].clubId == this.clubs[y].id)
                      {
                        this.studentList[i].club_name = this.clubs[y].name;
                      }
                    }
                  }
                  this.onSearch();
                },errorCode =>  this.statusCode = errorCode);
    }
    /**
     * Paginate function
     * @param event 
     */
    public pageChanged(event: any): void {
      let start = (event.page - 1) * event.itemsPerPage;
      let end = event.itemsPerPage > -1 ? (start + event.itemsPerPage) : this.students.length;
      this.data = this.students.slice(start, end);
    }

    /**
     * Action show modal
     * @param object 
     */
    public showModal(object)
    {
      this.studentInfor = object;
      console.log("Student Infor ",this.studentInfor);
      
      this.studentInforModal.show();
    }


    public fetchClubs()
    {
      this.clubServ.getAllClub()
      .subscribe(
                data => {
                  this.clubs = data;
                  console.log("CLUBS",this.clubs);
                },errorCode =>  console.log(errorCode));
    }

    public deleteStudent(studentId)
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
        console.log("Delete student ID ",studentId);
        me.studentServ.deleteStudentById(studentId)
        .subscribe(
                  data => {
                    me.fetchStudents();
                  },errorCode =>  console.log(errorCode));
      })
      
    }

    public onSearch()
    {
      this.students = this.studentList.filter(x => x.id.indexOf(this.id_search) != -1 && x.name.indexOf(this.name_search) != -1);
      this.totalItems = this.students.length;
      this.pageChanged({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
    }

    public onClear()
    {
      this.id_search="";
      this.name_search="";
      this.onSearch();
    }
}
