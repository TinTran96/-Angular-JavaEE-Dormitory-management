import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../modal/user';
import { FormGroup, FormBuilder, Validators, NgForm, AbstractControl, Validator } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
/**
*  This class represents the lazy loaded LoginComponent.
*/

@Component({
  selector: 'app-login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  private email:AbstractControl;
  private password:AbstractControl;
  private loginForm:FormGroup;
  private result:any=[];
  constructor(private userServ:UserService,private fb: FormBuilder,private router: Router,private route: ActivatedRoute) { 
  }
  ngOnInit(){
    this.buildform();
  }
  
  private buildform(){
    this.loginForm = this.fb.group({
        'email': ['', [Validators.required, Validators.maxLength(1536)]],
        'password':['', [Validators.required, Validators.maxLength(1536)]]
    });
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(false, data));
}
  public submitLogin()
  {
    this.onValueChanged(true);
    for (const field in this.formErrors) {
      if (this.formErrors[field].length > 0) {
        return;
      }
    }
    var email=this.loginForm.get('email').value;
    var password = this.loginForm.get('password').value;
    var user = new User("",password,email);
    console.log("USER",user);
    this.userServ.userLogin(user)
    .subscribe(data =>{
      this.result = data;
      if(this.result )
      {
        this.userServ.setUserLoggedIn(this.result);
        this.router.navigateByUrl('/dashboard/home');
      }
      else
      {
        swal(
          'Oops...',
          'Something went wrong!',
          'error'
        )
      }
      
      },errorCode =>{
        swal(
          'Error',
          'Wrong email or password! Try Again.',
          'error'
        )
      });
  }

  private onValueChanged(unDirty, data?: any) {
    if (!this.loginForm) { return; }
    const form1 = this.loginForm;
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
  };

  validationMessages = {
    'email': {
      'required': 'The email field is required.',
      'maxlength': 'The email may not be greater than 1536 characters.'
    },
    'password': {
      'required': 'The password field is required.',
      'maxlength': 'The password may not be greater than 1536 characters.'
    }
  };
}
