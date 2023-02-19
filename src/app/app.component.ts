import {Component} from '@angular/core';  
import { AuthService } from './services/auth.service';
import { User } from './userInterface'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent {

  title = 'Iqra task';  
  user!:User
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate 
      }  
     })   
  }
}
