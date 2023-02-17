import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule } from '@abacritt/angularx-social-login'; 
import { UploadImagesComponent } from './upload-images/upload-images.component'
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { LoginComponent } from './login/login.component'; 
import { AuthGuard } from './auth.guard'; 
import { HomeComponent } from './home/home.component'; 
import { HeaderComponent } from './header/header.component';
import { AngularFireModule } from '@angular/fire/compat'; 
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; 
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ContentsComponent } from './contents/contents.component';
import { ShowImagesComponent } from './show-images/show-images.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadImagesComponent,
    ShowImagesComponent,
    LoginComponent, 
    HomeComponent,
    HeaderComponent,
    ContentsComponent
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBoPaccZL3dlC4Ts1JKYdgOKTb83v_fAR8",
      authDomain: "task1-8dd72.firebaseapp.com",
      projectId: "task1-8dd72",
      storageBucket: "task1-8dd72.appspot.com",
      messagingSenderId: "130497920987",
      appId: "1:130497920987:web:17199257780113609df1fe",
      measurementId: "G-ZQQQC4BL2P"
    }), 
    BrowserModule,
    ReactiveFormsModule,
    SocialLoginModule ,
    RouterModule.forRoot([
      
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'contents',
        component:ContentsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'',
        component:HomeComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'UploadImages',
        component:UploadImagesComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'ShowImages',
        component:ShowImagesComponent,
        canActivate:[AuthGuard]
      }

       
    ])
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
