import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import { Observable } from '@firebase/util'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {   
  constructor( public angularfireAuth: AngularFireAuth,private router:Router){  
  } 
  isLoggedIn(): Observable<any>|any{ 
        return  this.angularfireAuth.user
  } 
  GoogleAuth(){
    //pass google provider to authLogin
    return this.AuthLogin(new GoogleAuthProvider())
    .then(result=>{
      this.router.navigate([''])
    })
    .catch((error=>{
      console.log("error in GoogleAuth method authService "+error)
    }));
  }  
  async AuthLogin(provider:GoogleAuthProvider) {
      return await this.angularfireAuth
      .signInWithPopup(provider)
      .then((result) => {   
      })
      .catch((error) => {
        console.log("error in AuthLogin method authService "+error)
      });
  }

  async AuthLogOut(){
    return await this.angularfireAuth
    .signOut()
    .then((result)=>{
      window.location.reload()
       
    })
    .catch((error)=>{
      console.log("error in AuthLogOut method authService "+ error)
    })
  }

  
}
