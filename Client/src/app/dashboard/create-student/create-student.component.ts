import { Component,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, AbstractControl, Validator } from '@angular/forms';
import { ModalModule,ModalDirective} from 'ngx-bootstrap';
import {SelectModule,SelectComponent} from 'ng2-select';
import { Student } from '../../modal/student';
import { StudentService } from '../../service/student.service';
import {RoomService} from '../../service/room.service';
import {ClassService} from '../../service/class.service';
import { ClubService } from '../../service/club.service';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Class } from 'app/modal/Class';
@Component({
    selector: 'app-create-student',
    templateUrl: './create-student.component.html',
    styleUrls: ['./create-student.component.css']
})

export class CreateStudentComponent {
    @ViewChild('SelectClub') public select_Club: SelectComponent;
    @ViewChild('RoomModal') private roomModal : ModalDirective;
    private name:AbstractControl = null;
    private id_param:any;
    private sub:any;
    private phone_number:AbstractControl = null;
    private dob:AbstractControl;
    private class_id:AbstractControl=null;
    private clubsList:any = [];
    private club:any = [];
    private club_value:any;
    private club_choice:any = null;
    private address:AbstractControl = null;
    private id: AbstractControl = null;
    private pob: AbstractControl;
    private religion: AbstractControl;
    private nation:AbstractControl = null;;
    private course:AbstractControl;
    private createStudent:FormGroup;
    private isCheckRadio:any;
    private minDate: Date;
    private date:any;
    private rooms:any =[];
    private room_flg:any=null;
    private currentPage: number = 1;
    private totalItems: number;
    private itemsPerPage: number = 5;
    private maxSize: number = 10;
    private data:any;
    private class_list:any;
    constructor(
      private fb: FormBuilder,
      private studentServ: StudentService,
      private clubServ: ClubService,
      private router: Router,
      private route: ActivatedRoute,
      private roomServ:RoomService,
      private classServ:ClassService
    ){

    }
    ngOnInit()
    {
      this.id_param=null;
      this.sub = this.route.params.subscribe(params => {
        this.id_param = params['id'];
      });
        this.minDate = new Date(1990, 5, 10);
        this.date = new Date();
        this.fetchClass();
        this.fetchAllClub();
        this.fetchRoom();
        this.buildform();
    }

    private buildform(){
        this.createStudent = this.fb.group({
            'name': ['', [Validators.required, Validators.maxLength(1536)]],
            'phone_number':['', [Validators.required, Validators.pattern('[0-9]+'),Validators.maxLength(11),Validators.minLength(8)]],
            'address':['',[Validators.required, Validators.maxLength(1536)]],
            'id':['',[Validators.required]],
            'pob':['',[Validators.required, Validators.maxLength(1536)]],
            'religion':['',[Validators.required, Validators.maxLength(1536)]],
            'nation':['',[Validators.required, Validators.maxLength(1536)]],
            'course':['',[Validators.required, Validators.maxLength(1536)]],
            'dob':[],
            'class_id':['',[Validators.required, Validators.maxLength(1536)]],
        });
        this.name = this.createStudent.controls['name'];
        this.phone_number = this.createStudent.controls['phone_number'];
        this.address = this.createStudent.controls['address'];
        this.id= this.createStudent.controls['id'];
        this.pob = this.createStudent.controls['pob'];
        this.religion = this.createStudent.controls['religion'];
        this.nation = this.createStudent.controls['nation'];
        this.course = this.createStudent.controls['course'];
        this.dob = this.createStudent.controls['dob'];
        this.class_id = this.createStudent.controls['class_id'];
        /*if(this.id_param != null)
        {
          this.setVar();
        }*/
        this.createStudent.valueChanges
          .subscribe(data => this.onValueChanged(false, data));
    }
    disable(ctrl_string) : void { 
      let ctrl = this.createStudent.get(ctrl_string);
      ctrl.enabled ? ctrl.disable() : ctrl.enable();
    }
    private setVar()
    {
        this.studentServ.getStudentById(this.id_param).subscribe(
          data=> {
            console.log("DATA WE GET",data);
            this.createStudent.controls['id'].setValue(data.id);
            this.createStudent.controls['address'].setValue(data.address);
            this.createStudent.controls['name'].setValue(data.name);
            this.createStudent.controls['phone_number'].setValue(data.phone);
            this.createStudent.controls['nation'].setValue(data.nation);
            this.createStudent.controls['religion'].setValue(data.religion);
            this.createStudent.controls['class_id'].setValue(data.classId);
            this.createStudent.controls['course'].setValue(data.course);
            this.createStudent.controls['pob'].setValue(data.pob);
            this.disable('id');
            this.date=new Date(data.dob);
            this.room_flg=data.roomId;
            this.checkFlg(data.gender);
            for(var i = 0; i<this.club.length;i++)
            {
              if(data.clubId === this.club[i].id)
              {
                this.club_value = this.club[i];
                this.club_choice = this.club[i];
                break;
              }
            }
            if(this.club_choice == null)
            {
              this.club_value = this.club[0];
              this.club_choice = this.club[0];
            }
        },errorCode =>  console.log(errorCode));
    }
    
    private onSubmit(){
      this.onValueChanged(true);
      for (const field in this.formErrors) {
        if (this.formErrors[field].length > 0) {
          return;
        }
      }
      var exist = 0;
      var count = 0;
      console.log("ID COMPARE",this.createStudent.get('class_id').value);
      for(var e = 0; e < this.class_list.length;e++)
      {
        console.log("ID compare",this.class_list[e].id)
        if(this.createStudent.get('class_id').value == this.class_list[e].id)
        {
          exist++;
          break;
        }
      }
      console.log("EXIST",exist);
      if(exist > 0)
      {
        if(this.club_choice!=null && this.club_choice.id != 0)
        {
          //Form is valid, now perform create or update
          let student={
            'id':this.createStudent.get('id').value,
            'name':this.createStudent.get('name').value,
            'class_id':this.createStudent.get('class_id').value,
            'club_id':this.club_choice.id,
            'room_id':this.room_flg,
            'gender': this.isCheckRadio,
            'dob': this.date,
            'ssn': "",
            'address': this.createStudent.get('address').value,
            'phone': this.createStudent.get('phone_number').value,
            'pob': this.createStudent.get('pob').value,
            'nation': this.createStudent.get('nation').value,
            'religion': this.createStudent.get('religion').value,
            'course': this.createStudent.get('course').value
          };
          console.log("STUDENT ",student);
          let student_obj= new Student(
                                        student.id,
                                        student.club_id,
                                        student.class_id,
                                        student.room_id,
                                        student.name,
                                        student.gender,
                                        student.dob,
                                        student.ssn,
                                        student.address,
                                        student.phone,
                                        student.pob,
                                        student.nation,
                                        student.religion,
                                        student.course);
          console.log("STUDENT OBJECT",student_obj);
          var me =this;
            if(this.id_param == null)
            {
            this.studentServ.createStudent(student_obj)
              .subscribe(successCode1 =>{
                console.log(successCode1);
                swal(
                  'Success',
                  'Create student success!',
                  'success'
                ).then(function () {
                  me.router.navigateByUrl('/dashboard/student-list');
                })
                
              },errorCode =>console.log(errorCode));
            
            }
            else
            {
              this.studentServ.updateStudent(student_obj)
              .subscribe(successCode =>{
                console.log(successCode);
                swal(
                  'Success',
                  'Update student success!',
                  'success'
                ).then(function () {
                  me.router.navigateByUrl('/dashboard/student-list');
                })
              },errorCode =>console.log(errorCode));
            }
          }
        }
        else
        {
          swal(
            'Error',
            'Class not exist!',
            'error'
          ).then(function () {
            return;
          })
        }
      }


    private fetchAllClub() {
      /*this.clubServ.getAllClub()
      .subscribe(
                data => {
                  this.clubsList = data;
                    for (var i = 0; i <  this.clubsList.length; i++) {
                        this.club.push({
                          id: this.clubsList[i].id,
                          text: `${this.clubsList[i].name}`
                        });
                    }
                    this.select_Club.items = this.club;
                    this.club_value = this.club[0];
                    console.log("LOAD XONG");
                },errorCode =>  console.log(errorCode));*/
                this.club.push({
                  id: 0,
                  text: 'Choose Club'
                });
                this.club.push({
                  id: 'CLB001',
                  text: 'Bơi lội'
                });
                this.club.push({
                  id: 'CLB002',
                  text: 'Bóng đá'
                });
                this.club.push({
                  id: 'CLB003',
                  text: 'Văn học'
                });
                this.club.push({
                  id: 'CLB004',
                  text: 'Văn Nghệ'
                });
                this.select_Club.items = this.club;
                this.club_value = this.club[0];
    }
    private checkFlg(value){
        if(this.isCheckRadio==undefined || this.isCheckRadio==null){
          this.isCheckRadio = '1';
        }
        if(value==this.isCheckRadio){
            return true;
        }
    }
    private changenameRadio(value){
      this.isCheckRadio =value;
    }
    private onValueChanged(unDirty, data?: any) {
        if (!this.createStudent) { return; }
        const form1 = this.createStudent;
        for (const field in this.formErrors) {
        // clear previous error message (if any)
          this.formErrors[field] = [];
          const control = form1.get(field);
          if (control && (control.dirty || unDirty) && control.invalid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              this.formErrors[field].push(messages[key]);
            }
          }
        }
      }

      formErrors = {
        'name': [],
        'phone_number':[],
        'address':[],
        'id':[],
        'pob':[],
        'religion': [],
        'nation':[],
        'course':[],
        'dob':[],
        'class_id':[],
      };
    
      validationMessages = {
        'name': {
          'required': 'The name field is required.',
          'maxlength': 'The name may not be greater than 1536 characters.'
        },
        'phone_number': {
          'required': 'The phone number field is required.',
          'maxlength': 'The phone number may not be greater than 11 characters.',
          'minlength': 'The phone number may not be less than 8 characters.',
          'pattern': 'Must be number'
        },
        'address':{
          'required': 'The address field is required.',
          'maxlength': 'The address may not be greater than 1536 characters.'
        },
        'id': {
          'required': 'The Id field is required.'
        },
        'pob': {
          'required': 'The place of birth field is required.'
        },
        'religion':{
          'required': 'The religion field is required.'
        },
        'nation':{
          'required': 'The nation field is required.'
        },
        'course':{
          'required': 'The course field is required.'
        },
        'dob':{
          'required': 'The date of birth field is required.'
        },
        'class_id':{
            'required': 'The class Id field is required.',
            'maxlength': 'The address may not be greater than 1536 characters.'
        }
      };
      public selectedClub(object)
      {
          console.log("==SELECTED CLUB==",object);
          this.club_choice = object;
      }

      public showModal()
      {
        this.roomModal.show();
      }

      public fetchRoom()
      {
        this.roomServ.getAllRoom()
        .subscribe(
                  data => {
                    this.rooms = data;
                    console.log("room",this.rooms);
                    this.fetchStudent();
                  },errorCode =>  console.log(errorCode));
      }

      

      /**
     * Paginate function
     * @param event 
     */
    public pageChanged(event: any): void {
      let start = (event.page - 1) * event.itemsPerPage;
      let end = event.itemsPerPage > -1 ? (start + event.itemsPerPage) : this.rooms.length;
      this.data = this.rooms.slice(start, end);
  }
  public submitChange(roomObj)
  {
    this.room_flg = roomObj.id;
    this.roomModal.hide();
  }

  public fetchStudent()
  {
    this.studentServ.getAllStudent()
    .subscribe(
      data => {
        var students = data;
        for(var y=0;y<this.rooms.length;y++)
        {
          this.rooms[y].students=[];
          for(var i = 0;i<students.length;i++)
          {
            if(students[i].roomId === this.rooms[y].id)
            {
              this.rooms[y].students.push(students[i]);
            }
          }
        }
        this.totalItems = this.rooms.length;
        this.pageChanged({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
        if(this.id_param != null)
        {
          this.setVar();
        }
      },errorCode =>  console.log(errorCode));
  }

  public fetchClass()
  {
    this.classServ.getAllClass()
    .subscribe(
      data => {
        this.class_list = data;
        console.log("Class",this.class_list);
      },errorCode =>  console.log(errorCode));
  }
}
