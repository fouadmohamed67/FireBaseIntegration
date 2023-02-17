import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthService } from '../services/auth.service';  
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {  
  
  user:any
    constructor(private router:Router,public authService:AuthService){
     
    }   
  ngOnInit(){
    this.authService.isLoggedIn().subscribe((user:any)=>{ 
      if(user)
      {
       this.user=user._delegate
      }
     })
  }
  goHome(){
    this.router.navigate(['']);
  }
  
}
