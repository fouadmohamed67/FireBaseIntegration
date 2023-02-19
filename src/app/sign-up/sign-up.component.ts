import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up', 
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  submited!:boolean;
  errorMessage!:string;
  form: FormGroup ;
  constructor(public authService: AuthService,private ngFireAuth:AngularFireAuth,private router:Router) {
    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    });
  } 
  
  signUp(form:FormGroup){  
        this.submited=true
        if(form.valid)
        {
          this.ngFireAuth.createUserWithEmailAndPassword(form.value.email,form.value.password)
          .then(()=>{
            this.router.navigate(['']);
          })
          .catch(error =>{  
            this.submited=false;
            this.errorMessage=this.getErrorMessage(error.message) as unknown  as string ;
          })
      } 
 }

 getErrorMessage(message:string){
  const cutedMessage=message.slice(message.indexOf(':')+1,message.indexOf('.'));
  return cutedMessage;
 }
}
