import { Component, ViewChild } from '@angular/core';
import { ModalModule,ModalDirective} from 'ngx-bootstrap';
import { SelectModule,SelectComponent} from 'ng2-select';
import { AbsencesService } from '../../service/absences.service';
import { StudentService } from '../../service/student.service';
import swal from 'sweetalert2';
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
  }
@Component({
    selector: 'app-absences',
    templateUrl: './absences.component.html',
    styleUrls: ['./absences.component.css']
})

export class AbsencesComponent {
    private absencesList:any = [];
    public tableData1: TableData;
    private data: any = [];
    private currentPage: number = 1;
    private totalItems: number;
    private itemsPerPage: number = 10;
    private maxSize: number = 10;
    constructor(
        private studentServ:StudentService,
        private absencesServ:AbsencesService,
                ) { }

    ngOnInit() {
        this.fetchAbsences();
    }
    public fetchAbsences()
    {
      this.absencesServ.getAllAbsences()
      .subscribe(
                data => {
                  this.absencesList = data;
                  this.totalItems = this.absencesList.length;
                  this.pageChanged({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
                },errorCode =>  console.log(errorCode));
    }
    /**
     * Paginate function
     * @param event 
     */
    public pageChanged(event: any): void {
        let start = (event.page - 1) * event.itemsPerPage;
        let end = event.itemsPerPage > -1 ? (start + event.itemsPerPage) : this.absencesList.length;
        this.data = this.absencesList.slice(start, end);
    }

    public deleteAbsences(absencesId)
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
        console.log("Delete student ID ",absencesId);
        me.absencesServ.deleteAbsencesById(absencesId)
        .subscribe(
                  data => {
                    me.fetchAbsences();
        },errorCode => {console.log(errorCode);});
      });
    }


}