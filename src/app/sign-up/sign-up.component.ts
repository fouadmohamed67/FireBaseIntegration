import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  form: FormGroup ;
  constructor(public authService: AuthService,private ngFireAuth:AngularFireAuth,private router:Router) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  } 
  
  signUp(form:FormGroup){ 
     
    this.ngFireAuth.createUserWithEmailAndPassword(form.value.email,form.value.password)
   .then(res=>{
    this.router.navigate([''])
   })
   .catch(error=>{
    alert("enter formated email and password")
     
   })
 }
}
