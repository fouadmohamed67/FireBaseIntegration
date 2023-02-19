import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { User } from '../userInterface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  oldContent:any|"aaa"
  user!:User
  test="Sss"
  constructor(private router:Router,private ngFireDatabase:AngularFireDatabase,private authService:AuthService){
    this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate 
       this.getOldContent()
      } 
     })
  }
  ngOnInIt(){}
  submitContent(){
    const  content=document.querySelector('#froala-editor p')?.innerHTML
    console.log(content)
    this.ngFireDatabase.database.ref("contents/").update({
      publisher:this.user.uid,
      content:content, 
    })
   }
  getOldContent(){
    try {
        if(this.user)
        {
          this.ngFireDatabase.list('contents/').valueChanges().subscribe(async(data)=>{
             this.oldContent=data[0];  
          });
        }
    } catch (error) {
        console.log("error in getAllContents method at ContentsComponent")
    }
  }

}
