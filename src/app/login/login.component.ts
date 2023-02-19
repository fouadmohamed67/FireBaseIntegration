import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';   
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  form: FormGroup;
  constructor(public authService: AuthService,private ngFireAuth:AngularFireAuth,private router : Router) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  } 
  signIn(form:FormGroup){ 
     this.ngFireAuth.signInWithEmailAndPassword (form.value.email,form.value.password)
    .then(res=>{
      this.router.navigate([''])
    })
    .catch(error=>{
      alert("password and email does not matches")
      console.log(error) 
    })
  }
}
