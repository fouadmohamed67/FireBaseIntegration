import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { AuthService } from '../services/auth.service'; 
import { User } from '../userInterface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  flashMessage=false
  oldContent:any;
  user!:User;
  constructor(private router:Router,private ngFireDatabase:AngularFireDatabase,private authService:AuthService){
    this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate;
       this.getOldContent();
      } 
     })
  }
  
  submitContent(){
    const  content=document.querySelector('#froala-editor')?.querySelector('#froala-viewer')?.innerHTML || document.querySelector('#froala-editor p')?.innerHTML
    this.ngFireDatabase.database.ref("contents/").update({
      publisher:this.user.uid,
      content:content, 
    });
    this.flashMessage=true
    setTimeout(()=>{
      this.flashMessage=false
    },3000) 
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
