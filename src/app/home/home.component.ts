import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/compat/database'
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  content = new FormControl('');
  user:any
  constructor(private router:Router,private ngFireDatabase:AngularFireDatabase,private authService:AuthService){
    this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate 
      } 
     })
  }
  submitContent(){
      
    this.ngFireDatabase.database.ref("contents/").push({
      publisher:this.user.uid,
      content:this.content.value, 
    })
    this.router.navigate(['contents'])  

  }

}
