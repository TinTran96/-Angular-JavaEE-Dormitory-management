import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../modal/user';
import { FormGroup, FormBuilder, Validators, NgForm, AbstractControl, Validator } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
/**
*  This class represents the lazy loaded SignupComponent.
*/

@Component({
  selector: 'app-signup-cmp',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignupComponent {
  private username:AbstractControl;
  private email:AbstractControl;
  private password:AbstractControl;
  private repassword:AbstractControl;
  private signupForm:FormGroup;
  constructor(private userServ:UserService,private fb: FormBuilder,private router: Router,private route: ActivatedRoute)
  {}
  ngOnInit(){
    this.buildform();
  }
  
  private buildform(){
    this.signupForm = this.fb.group({
        'email': ['', [Validators.required, Validators.maxLength(1536)]],
        'password':['', [Validators.required, Validators.maxLength(1536)]],
        'username': ['', [Validators.required, Validators.maxLength(1536)]],
        'repassword':['', [Validators.required, Validators.maxLength(1536)]]
    },{
      validator: PasswordValidation.MatchPassword,
    });
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
    this.username = this.signupForm.controls['username'];
    this.repassword = this.signupForm.controls['repassword'];
    this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged(false, data));
  }
  private onValueChanged(unDirty, data?: any) {
    if (!this.signupForm) { return; }
    const form1 = this.signupForm;
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
    'email': [],
    'password':[],
    'username': [],
    'repassword':[],
  };

  validationMessages = {
    'email': {
      'required': 'The email field is required.',
      'maxlength': 'The email may not be greater than 1536 characters.'
    },
    'password': {
      'required': 'The password field is required.',
      'maxlength': 'The password may not be greater than 1536 characters.'
    },
    'repassword': {
      'required': 'The repassword field is required.',
      'maxlength': 'The repassword may not be greater than 1536 characters.'
    },
    'username': {
      'required': 'The name field is required.',
      'maxlength': 'The name may not be greater than 1536 characters.'
    }
  };
  submitSignUp(){
    this.onValueChanged(true);
    for (const field in this.formErrors) {
      if (this.formErrors[field].length > 0) {
        return;
      }
    }
    if(this.signupForm.get('password').value === this.signupForm.get('repassword').value)
    {
      var me = this;
      let user={
        'email':this.signupForm.get('email').value,
        'password':this.signupForm.get('password').value,
        'username':this.signupForm.get('username').value
      };
      let user_obj = new User(user.username,user.password,user.email);
      this.userServ.createUser(user_obj)
      .subscribe(successCode1 =>{
        console.log(successCode1);
        swal(
          'Success',
          'Create user success!',
          'success'
        ).then(function () {
          me.router.navigateByUrl('/');
        })
      },errorCode =>{
        swal(
          'Error',
          'Email not valid!',
          'error'
        )
        console.log(errorCode)
      });
    }
  }
 }

 export class PasswordValidation {
  
      static MatchPassword(AC: AbstractControl) {
         let password = AC.get('password').value; // to get value in input tag
         let confirmPassword = AC.get('repassword').value; // to get value in input tag
          if(password != confirmPassword) {
              console.log('false');
              AC.get('repassword').setErrors( {MatchPassword: true} )
          } else {
              console.log('true');
              return null;
          }
      }
  }
