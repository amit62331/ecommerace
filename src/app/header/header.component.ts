import { AuthService } from './../auth/auth.service';
import { DataStoreService } from './../shared/data-store-service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Response } from '@angular/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  constructor(
     private dataStoreService:DataStoreService,
     private authService:AuthService) { }
  
 onSaveData(){
   this.dataStoreService.storeRecipe()
   .subscribe(
     (response:Response)=>console.log()
   );
 }
 onFetchData(){
   this.dataStoreService.getRecipe();
 }

 onLogOut(){
   this.authService.logOut();
 }
}
