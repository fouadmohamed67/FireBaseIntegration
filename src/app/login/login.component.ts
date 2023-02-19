import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';   
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage!:string
  form: FormGroup;
  constructor(public authService: AuthService,private ngFireAuth:AngularFireAuth,private router : Router) {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  } 
  signIn(form:FormGroup){ 
     this.ngFireAuth.signInWithEmailAndPassword (form.value.email,form.value.password)
    .then(res=>{
      this.router.navigate([''])
    })
    .catch(error=>{
      this.errorMessage=error.message 
    })
  }
}
