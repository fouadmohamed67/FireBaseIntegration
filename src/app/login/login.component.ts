import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';   
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StringServiceService } from '../services/string-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage!:string
  form: FormGroup;
  submited!:boolean

  constructor(public authService: AuthService,private ngFireAuth:AngularFireAuth,private router : Router,private strService:StringServiceService) {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  } 

  signIn(form:FormGroup){ 
    this.submited=true
     if(this.form.valid)
     {
      this.ngFireAuth.signInWithEmailAndPassword (form.value.email,form.value.password)
      .then(()=>{
        this.router.navigate(['']);
      })
      .catch(error=>{
        this.submited=false;
        this.errorMessage=this.strService.getErrorMessage(error.message) as unknown  as string; 
      })
     }
  }
  
}
