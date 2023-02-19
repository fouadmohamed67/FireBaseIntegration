import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthService } from '../services/auth.service';  
import { User } from '../userInterface'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {  
  user!:User
    constructor(private router:Router,public authService:AuthService){
    
    }   
  ngOnInit(){
    try {
      this.authService.isLoggedIn().subscribe((user:any)=>{ 
        if(user)
        {
         this.user=user._delegate 
        }
       })

    } catch (error) {
      console.log("error in ngOnInit method at HeaderComponent")

    }
  }
  goHome(){
    this.router.navigate(['']);
  }
  
}
