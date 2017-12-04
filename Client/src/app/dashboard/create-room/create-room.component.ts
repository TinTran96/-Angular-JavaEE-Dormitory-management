import { Component,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, AbstractControl, Validator } from '@angular/forms';
import { ModalModule,ModalDirective} from 'ngx-bootstrap';
import {SelectModule,SelectComponent} from 'ng2-select';
import {Building} from '../../modal/building';
import {Floor} from '../../modal/floor';
import {Room} from '../../modal/room';
import {FloorService} from '../../service/floor.service';
import {BuildingService} from '../../service/building.service';
import {RoomService} from '../../service/room.service';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.css']
})

export class CreateRoomComponent {
    @ViewChild('selectBuilding') public selectBuilding: SelectComponent;
    @ViewChild('selectFloor') public selectFloor: SelectComponent;
    private roomId:AbstractControl;
    private capacity:AbstractControl;
    private createRoom:FormGroup;
    private building:any=[];
    private buildings:any;
    private floor:any=[];
    private floors:any;
    private building_disabled:boolean;
    private floor_disabled:boolean;
    private building_value:any;
    private floor_value:any;
    private floor_choice:any = null;
    private sub:any;
    private showBuilding:boolean = false;
    private showFloor:boolean = false;
    private id_param:any=null;
    constructor(
        private fb: FormBuilder,
        private floorServ:FloorService,
        private buildingServ:BuildingService,
        private roomServ:RoomService,
        private router: Router,
        private route: ActivatedRoute,
    ){
        this.building_disabled = false;
        this.floor_disabled = true;
    }
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.sub = this.route.params.subscribe(params => {
            this.id_param = params['id'];
          });
        this.fetchFloor();
        this.fetchBuilding();
        this.buildform();
    }
    private buildform(){
        this.createRoom = this.fb.group({
            'roomId': ['', [Validators.required, Validators.maxLength(1536)]],
            'capacity':['',[Validators.required, Validators.maxLength(1536)]],
        });
        this.roomId = this.createRoom.controls['roomId'];
        this.capacity = this.createRoom.controls['capacity'];
        if(this.id_param != null)
        {
          this.setVar();
        }
        this.createRoom.valueChanges
          .subscribe(data => this.onValueChanged(false, data));
    }
    private onValueChanged(unDirty, data?: any) {
        if (!this.createRoom) { return; }
        const form1 = this.createRoom;
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
        'roomId': [],
        'reason':[],
      };
    
      validationMessages = {
        'roomId': {
          'required': 'The room Id field is required.',
          'maxlength': 'The room Id may not be greater than 1536 characters.'
        },
        'capacity': {
          'required': 'The capacity field is required.',
          'maxlength': 'The capacity may not be greater than 1536 characters.'
        }
      };

      public fetchBuilding()
      {
        this.buildingServ.getAllBuilding()
        .subscribe(
                  data => {
                    this.buildings = data;
                    this.building.push({
                        id: 0,
                        text: 'Choose Building'
                        });
                    for (var i = 0; i <  this.buildings.length; i++) {
                        this.building.push({
                          id: this.buildings[i].id,
                          text: `${this.buildings[i].id}`
                        });
                    }
                    
                    this.building_value = this.building[0];
                    
                    
                    this.showBuilding=true;
                    console.log("buildings",this.buildings);
                    
                  },errorCode =>  console.log(errorCode));
      }

      public fetchFloor()
      {
        this.floorServ.getAllFloor()
        .subscribe(
                  data => {
                    this.floors = data;
                    console.log("floors",this.floors);
                    
                  },errorCode =>  console.log(errorCode));
      }

      public selectedBuilding(object)
      {
        this.floor=[];
        console.log("==SELECTED Building==",object);
          this.floor_disabled = false;
          this.floor.push({
            id: 0,
            text: 'Choose Floor'
            });
          for (var i = 0; i <  this.floors.length; i++) {
            if(this.floors[i].buildingId == object.id)
            {
            this.floor.push({
                id: this.floors[i].id,
                text: `${this.floors[i].id}`
                });
            }
        }
        //this.selectFloor.items = this.floor;
        
        this.floor_value = this.floor[0];
        
        this.showFloor = true;
      }

      public selectedFloor(object)
      {
        this.floor_choice = object;
      }

      private onSubmit(){
        this.onValueChanged(true);
        for (const field in this.formErrors) {
          if (this.formErrors[field].length > 0) {
            return;
          }
        }
        if(this.floor_choice != null)
        {
          //Form is valid, now perform create or update
          let room={
              'id':this.createRoom.get('roomId').value,
              'capacity':this.createRoom.get('capacity').value,
              'floorId':this.floor_choice.id
          }
          let obj= new Room(
            room.id,
            room.floorId,
            room.capacity,
           );
          console.log("Room OBJECT",obj);
          var me =this;
            if(this.id_param == null)
            {
            this.roomServ.createRoom(obj)
              .subscribe(successCode1 =>{
                console.log(successCode1);
                swal(
                  'Success',
                  'Create room success!',
                  'success'
                ).then(function () {
                  me.router.navigateByUrl('/dashboard/room-list');
                })
                
              },errorCode =>console.log(errorCode));
            
            }
            else
            {
              obj.id = this.id_param;
              this.roomServ.updateRoom(obj)
              .subscribe(successCode =>{
                console.log(successCode);
                swal(
                  'Success',
                  'Update room success!',
                  'success'
                ).then(function () {
                  me.router.navigateByUrl('/dashboard/room-list');
                })
              },errorCode =>console.log(errorCode));
            }
          }
          else{
            swal(
              'Error',
              'Choose Floor!',
              'error'
            )
            return;
          }
        }

        private setVar()
        {
            this.roomServ.getRoomById(this.id_param).subscribe(
              data=> {
                console.log("DATA WE GET",data);
                this.createRoom.controls['roomId'].setValue(data.id);
                this.createRoom.controls['capacity'].setValue(data.capacity);
                for(var i = 0;i<this.floors.length;i++)
                {
                    if(this.floors[i].id == data.floorId)
                    {
                        this.floor_choice = this.floors[i];
                        console.log("Floor Choice",this.floor_choice);
                    }
                }

                for(var y = 0;y< this.building.length;y++)
                {
                    if(this.building[y].id === this.floor_choice.buildingId)
                    {
                        this.building_value = this.building[y];
                    }
                }
                let obj ={
                    'id':this.floor_choice.buildingId
                } ;
                this.selectedBuilding(obj);
                for(var z = 0;z< this.floor.length;z++)
                {
                    if(this.floor[z].id === this.floor_choice.id)
                    {
                        this.floor_value = this.floor[z];
                    }
                }
            },errorCode =>  console.log(errorCode));
        }
}
