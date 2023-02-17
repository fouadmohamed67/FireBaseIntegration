import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { async } from '@firebase/util';
 
interface Data{
  date:string,
  photoUrl:string,
  title:string
}
@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css']
})
export class ShowImagesComponent {
  user:any
  keys:any
  imagesInfo!:Array<Data> |any
  constructor( private router:Router,private authService:AuthService,private ngFireDatabase:AngularFireDatabase){ 
    
  }
  async ngOnInit(){  
   await this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate  
       this.getUserImages()  
      }  
     })  
  } 
  getUserImages(){ 
    
      try {
        const folderName=this.user.uid  
        this.ngFireDatabase.list('images/'+folderName).valueChanges().subscribe(async(data:any)=>{  
          this.imagesInfo= data; 
          this.ngFireDatabase.list('images/'+folderName).snapshotChanges().subscribe(async(keys:any)=>{
          this.keys=keys   
          })
        });   
      } catch (error) {
        console.log("error at method getUserImages in ShowImagesComponent")
      } 
   
  }
  deleteImage(index:number)
  {
    const folderName=this.user.uid  
    this.ngFireDatabase.database.ref().child('images/'+folderName+'/'+this.keys[index].key+'/').remove()
    
  }
}
