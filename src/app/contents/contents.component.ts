import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../userInterface'

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent {
  contents:any
  user!:User
  innerContent:any
  content = new FormControl('');
  constructor(private ngFireDatabase:AngularFireDatabase,private authService:AuthService){
    
  }
   ngOnInit(){ 
    try {
      this.innerContent="chose content to view"
      this.authService.isLoggedIn().subscribe((user:any)=>{ 
        if(user)
        {
        this.user=user._delegate
        this.getAllContents();
        }  
      })
    } catch (error) {
      console.log("error in ngOnInit method at ContentsComponent")
    } 
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
  renderContent(index:any){
    try {
      this.innerContent  =this.contents[index].content 
    } catch (error) {
      console.log("error in renderContent method at ContentsComponent")
    } 
    
  }
}
