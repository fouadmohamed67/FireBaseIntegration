import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringServiceService {

   
  getErrorMessage(message:string){
    const cutedMessage=message.slice(message.indexOf(':')+1,message.indexOf('.'));
    return cutedMessage;
   }
}
