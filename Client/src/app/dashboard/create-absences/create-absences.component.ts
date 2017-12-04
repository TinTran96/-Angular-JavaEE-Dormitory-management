import { Component,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, AbstractControl, Validator } from '@angular/forms';
import { ModalModule,ModalDirective} from 'ngx-bootstrap';
import {SelectModule,SelectComponent} from 'ng2-select';
import { Absences } from '../../modal/absences';
import { StudentService } from '../../service/student.service';
import { AbsencesService } from '../../service/absences.service';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: 'app-create-absences',
    templateUrl: './create-absences.component.html',
    styleUrls: ['./create-absences.component.css']
})

export class CreateAbsencesComponent {
    @ViewChild('StudentModal') private studentModal : ModalDirective;
    private view_flg:Boolean;
    private id_param:any;
    private sub:any;
    private numofabsences: AbstractControl = null;
    private reason: AbstractControl;
    private startdate_ctrl:AbstractControl;
    private createAbsences:FormGroup;
    private minDate: Date;
    private date:any;
    private students:any =[];
    private student_flg:any=null;
    private currentPage: number = 1;
    private totalItems: number;
    private itemsPerPage: number = 5;
    private maxSize: number = 10;
    private data:any;
    constructor(private fb: FormBuilder,
      private studentServ: StudentService,
      private router: Router,
      private route: ActivatedRoute,
      private absencesServ:AbsencesService){

    }
    ngOnInit()
    {
      this.view_flg = true;
      this.id_param=null;
      this.sub = this.route.params.subscribe(params => {
        this.id_param = params['id'];
      });
      if (this.router.url.indexOf('/absences/create') != -1)
      {
        this.view_flg = false;
      }
      
        this.minDate = new Date(1990, 5, 10);
        this.date = new Date();
        this.fetchStudent();
        this.buildform();
    }
    disable(ctrl_string) : void { 
      let ctrl = this.createAbsences.get(ctrl_string);
      ctrl.enabled ? ctrl.disable() : ctrl.enable();
    }

    
    private buildform(){
        this.createAbsences = this.fb.group({
            'numofabsences': ['', [Validators.required, Validators.maxLength(1536)]],
            'reason':['',[Validators.required, Validators.maxLength(1536)]],
        });
        this.numofabsences = this.createAbsences.controls['numofabsences'];
        this.reason = this.createAbsences.controls['reason'];
        if(this.id_param != null)
        {
          this.setVar();
        }
        if (this.router.url.indexOf('/absences/view') != -1)
        {
          this.view_flg = true;
          this.disable('numofabsences');
          this.disable('reason');
        }
        this.createAbsences.valueChanges
          .subscribe(data => this.onValueChanged(false, data));
    }

    private setVar()
    {
        this.absencesServ.getAbsencesById(this.id_param).subscribe(
          data=> {
            console.log("DATA WE GET",data);
            this.createAbsences.controls['numofabsences'].setValue(data.numofabsences);
            this.createAbsences.controls['reason'].setValue(data.reason);
            this.date=new Date(data.startdate);
            this.student_flg=data.studentId;
        },errorCode =>  console.log(errorCode));
    }

    private onSubmit(){
      console.log("DATE",this.date);
      this.onValueChanged(true);
      for (const field in this.formErrors) {
        if (this.formErrors[field].length > 0) {
          return;
        }
      }
      if(this.student_flg != null && this.student_flg != "")
      {
        //Form is valid, now perform create or update
        let absence={
          'numofabsences':this.createAbsences.get('numofabsences').value,
          'studentId':this.student_flg,
          'startdate':this.date,
          'reason':this.createAbsences.get('reason').value,
        };
        console.log("Absences ",absence);
        let obj= new Absences(
          null,
          absence.studentId,
          absence.startdate,
          absence.numofabsences,
          absence.reason
                              );
        console.log("Absences OBJECT",obj);
        var me =this;
          if(this.id_param == null)
          {
          this.absencesServ.createAbsences(obj)
            .subscribe(successCode1 =>{
              console.log(successCode1);
              swal(
                'Success',
                'Create absences success!',
                'success'
              ).then(function () {
                me.router.navigateByUrl('/dashboard/absences');
              })
              
            },errorCode =>console.log(errorCode));
          
          }
          else
          {
            obj.id = this.id_param;
            this.absencesServ.updateAbsences(obj)
            .subscribe(successCode =>{
              console.log(successCode);
              swal(
                'Success',
                'Update absences success!',
                'success'
              ).then(function () {
                me.router.navigateByUrl('/dashboard/absences');
              })
            },errorCode =>console.log(errorCode));
          }
        }
        else{
          swal(
            'Error',
            'Choose student!',
            'error'
          )
          return;
        }
      }
    
    private onValueChanged(unDirty, data?: any) {
        if (!this.createAbsences) { return; }
        const form1 = this.createAbsences;
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
        'numofabsences': [],
        'reason':[],
      };
    
      validationMessages = {
        'numofabsences': {
          'required': 'The num of absences field is required.',
          'maxlength': 'The num of absences may not be greater than 1536 characters.'
        },
        'reason': {
          'required': 'The reason field is required.',
          'maxlength': 'The reason may not be greater than 1536 characters.'
        }
      };

      public showModal()
      {
        this.studentModal.show();
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
  public submitChange(Obj)
  {
    this.student_flg = Obj.id;
    this.studentModal.hide();
  }

  public fetchStudent()
  {
    this.studentServ.getAllStudent()
    .subscribe(
      data => {
        this.students = data;
        this.totalItems = this.students.length;
        this.pageChanged({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
        if(this.id_param != null)
        {
          this.setVar();
        }
      },errorCode =>  console.log(errorCode));
  }
}
