import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../userInterface'
interface Data{
  date:string,
  photoUrl:string,
  title:string
}
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent {
  clearing:any
  keys:any
  imagesInfo!:Array<Data> |any
  loading!:boolean
  user!:User
  path!:string
  imageUrl!:string
  file:any
  title = new FormControl(''); 
  constructor( private router:Router,private authService:AuthService,private ngFireDatabase:AngularFireDatabase, private ngFireStorage:AngularFireStorage ){ 
    
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
   async uploadImage(){  
    if(!this.title.value || !this.file )
    {
      alert("put title and select image")
    }
    else
    {
      try {
        const folderName=this.user.uid  
        this.loading=true
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
          this.loading=false
          this.clearing=''
        this.router.navigate(['Images']) 
      } catch (error) {
        console.log("error in uploadImage method at UploadImagesComponent")
      }
    }  
     
  }
  onFileChange($event:any){
    this.file=$event.target.files[0]
    this.path=$event.target.files[0].name
  }

}
