import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent {
  contents:any
  user:any
  innerContent:any
  content = new FormControl('');
  constructor(private router:Router,private ngFireDatabase:AngularFireDatabase,private authService:AuthService){
    
  }
   ngOnInit(){ 
    this.innerContent="chose content to view"
    this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate
       this.getAllContents();
      }  
     }) 
  }
   

  getAllContents(){
    try {
        if(this.user)
        {
          this.ngFireDatabase.list('contents/').valueChanges().subscribe(async(data)=>{ 
            const newData= data.filter((item:any)=> item.publisher==this.user.uid)
            this.contents=Object.values(newData);  
          });
        }
        else
        {
          this.contents=[]
        }
    } catch (error) {
        console.log("error in getAllContents method at ContentsComponent")
    }
  }

  editContent(){

  }
  renderContent(index:any){
    this.innerContent  =this.contents[index].content  
    
  }
}
