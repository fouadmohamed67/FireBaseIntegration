import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../userInterface'
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent {
  user:any
  path!:string
  imageUrl!:string
  file:any
  title = new FormControl(''); 
  constructor(private ngFireStorage:AngularFireStorage,private router:Router,private authService:AuthService,private ngFireDatabase:AngularFireDatabase){

  }
  ngOnInit(){ 
    this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate 
      }  
     })   
  }  
   
  async uploadImage(){  
    if(!this.title.value || !this.file )
    {
      alert("put title and select image")
    }
    else
    {
      const folderName=this.user.uid  
      const currentDate = new Date().toLocaleString("en-US", {timeZone: 'Africa/Cairo'})
      //const ksaData=new Date(currentDate).toLocaleString("en-US", {timeZone: 'Asia/Riyadh'}) 
      const UploadTask =await (await this.ngFireStorage.upload(folderName+"/"+this.path,this.path)).ref.put(this.file) 
        UploadTask.task.snapshot.ref.getDownloadURL().then(url=>{
          this.ngFireDatabase.database.ref("images/"+ this.user.uid+ "/").push({
            title:this.title.value,
            date:currentDate,
            photoUrl:url 
          })    
          
        })
        this.router.navigate(['ShowImages']) 
    }  
     
  }
  onFileChange($event:any){
    this.file=$event.target.files[0]
    this.path=$event.target.files[0].name
    
  }
}
 

